import { useEffect, useRef, useState } from "react";
import Panzoom from "@panzoom/panzoom";
import { PALM_RIVER_AREA_ID } from "./PalmRiverBuildingsData.js";

// ============================================================
// HẰNG SỐ DÙNG CHUNG
// ============================================================

// Kích thước scene cố định, PHẢI khớp viewBox của svg overlay (1680x900).
// Panzoom cần scene kích thước cố định để công thức zoom-tới-điểm chính xác.
export const SCENE_WIDTH = 1680;
export const SCENE_HEIGHT = 900;

// Hệ số zoom (nhân thêm vào fitScale — tỉ lệ scene đang fit vừa khung hiển thị)
const ZOOM_LEVEL_PALM_RIVER = 2.2;
const ZOOM_LEVEL_BUILDING = 4;
const ZOOM_ANIMATION_MS = 550;

// Thời gian hiển thị tooltip "đang cập nhật" khi click vào toà chưa có mặt bằng
const COMING_SOON_TOOLTIP_MS = 1800;

// Tâm hiển thị Palm River lấy theo vị trí popup của Area 3 trong CSS:
// .amen_site .map-amen .area-popup.area-popup-1 { top: 32%; left: 25%; }
// Quy đổi trực tiếp sang hệ tọa độ scene 1680x900.
const PALM_RIVER_FOCUS_X = SCENE_WIDTH * 0.25;
const PALM_RIVER_FOCUS_Y = SCENE_HEIGHT * 0.32;

// 4 sân thượng/tháp lấy trực tiếp từ SVG tool của bạn.
// Tool dùng viewBox 3360x1800; scene TienIch dùng 1680x900 => scale 0.5.
export const ROOFTOPS = [
  { id: "thap-4", points: "777.5,521.1 702.2,482.1 674.4,523.9 758.0,560.1" },
  { id: "thap-3", points: "799.8,560.1 769.1,582.4 805.3,657.7 849.9,624.2" },
  { id: "thap-1", points: "875.0,643.7 958.6,640.9 961.4,677.2 869.4,685.5" },
  { id: "thap-2", points: "989.2,593.6 1033.8,593.6 1033.8,652.1 989.2,652.1" },
].map((roof) => ({
  ...roof,
  // Tool vẽ dùng viewBox 3360x1800; TienIch dùng scene 1680x900.
  points: roof.points
    .split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return `${x * (SCENE_WIDTH / 3360)},${y * (SCENE_HEIGHT / 1800)}`;
    })
    .join(" "),
}));

export const getPolygonBBox = (points) => {
  const coords = points.split(" ").map((p) => p.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

// ============================================================
// HOOK CHÍNH — gom toàn bộ state + logic Panzoom + luồng zoom
// Palm River → toà nhà (click 1: zoom) → mặt bằng (click 2: mở modal)
// ============================================================
export function useTienIchMap() {
  // ── Hover/click cho 40 điểm ghim & 4 vùng AREAS ──
  const [hoverId, setHoverId] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const activeId = hoverId ?? clickedId;

  const [hoverArea, setHoverArea] = useState(null);
  const [clickedArea, setClickedArea] = useState(null);
  const activeArea = hoverArea ?? clickedArea;

  // ── State cho luồng zoom Palm River → toà nhà → mặt bằng ──
  const [isZoomedToPalmRiver, setIsZoomedToPalmRiver] = useState(false);

  // Toà đang được "chọn" (đã zoom tới, chờ click lần 2 để mở modal).
  // Tách riêng khỏi activeBuildingId — activeBuildingId CHỈ dùng để mở modal.
  const [zoomedBuildingId, setZoomedBuildingId] = useState(null);
  const [activeBuildingId, setActiveBuildingId] = useState(null);
  const [hoveredBuildingId, setHoveredBuildingId] = useState(null);

  // Toà nhà vừa bị click nhưng CHƯA có ảnh mặt bằng -> hiện tooltip "đang cập nhật"
  const [comingSoonId, setComingSoonId] = useState(null);
  const comingSoonTimeoutRef = useRef(null);

  const rootRef = useRef(null);
  const viewportRef = useRef(null); // = .map-amen, khung hiển thị (không bị scale)
  const sceneRef = useRef(null); // = .zoom-scene, khối bị Panzoom scale/pan
  const panzoomRef = useRef(null);
  const fitScaleRef = useRef(1); // tỉ lệ để scene 1680x900 vừa khít khung hiển thị hiện tại
  const palmRiverTargetRef = useRef(null); // lưu tâm + scale của vùng Palm River, dùng khi zoom-out từ building

  const toggleClickedId = (id) => {
    setClickedId((prev) => (prev === id ? null : id));
  };
  const toggleClickedArea = (id) => {
    setClickedArea((prev) => (prev === id ? null : id));
  };

  // Bấm ra ngoài map / list → tắt trạng thái sticky
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setClickedId(null);
        setClickedArea(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Dọn timeout tooltip "đang cập nhật" khi unmount
  useEffect(() => {
    return () => {
      if (comingSoonTimeoutRef.current) {
        window.clearTimeout(comingSoonTimeoutRef.current);
      }
    };
  }, []);

  // ── Khởi tạo Panzoom + tự fit scene theo kích thước khung hiển thị ──
  useEffect(() => {
    if (!viewportRef.current || !sceneRef.current) return;

    const panzoom = Panzoom(sceneRef.current, {
      minScale: 0.1,
      maxScale: 5,
      contain: "outside",
      animate: true,
      duration: ZOOM_ANIMATION_MS,
      disablePan: false,
      disableZoom: false,
    });
    panzoomRef.current = panzoom;

    const applyFitScale = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const fit = viewport.clientWidth / SCENE_WIDTH;
      fitScaleRef.current = fit;
      panzoom.setOptions({ minScale: fit, maxScale: fit * 5 });
      // chỉ auto re-fit khi đang ở view tổng, tránh giật hình khi user đang zoom sâu
      if (!isZoomedToPalmRiver && !activeBuildingId) {
        panzoom.zoom(fit, { animate: false });
        panzoom.pan(0, 0, { animate: false });
      }
    };

    applyFitScale();
    const resizeObserver = new ResizeObserver(applyFitScale);
    resizeObserver.observe(viewportRef.current);

    return () => {
      resizeObserver.disconnect();
      panzoom.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi đã zoom vào Palm River/tháp, khóa pan + wheel zoom để map không trôi.
  const setMapLocked = (locked) => {
    const panzoom = panzoomRef.current;
    if (!panzoom) return;
    panzoom.setOptions({ disablePan: locked, disableZoom: locked });
  };

  // Zoom tới tâm phần tử. Nhận cả trường hợp targetEl là chính path/polygon
  // (building click truyền thẳng polygon) lẫn trường hợp là group cha chứa path/polygon.
  const zoomToElement = (targetEl, scaleMultiplier, onDone) => {
    const panzoom = panzoomRef.current;
    const viewport = viewportRef.current;
    if (!targetEl) return null;

    const pathEl = targetEl.matches?.("path, polygon")
      ? targetEl
      : targetEl.querySelector?.("path, polygon");
    if (!panzoom || !viewport || !pathEl) return null;

    const bbox = pathEl.getBBox();
    const targetX = bbox.x + bbox.width / 2;
    const targetY = bbox.y + bbox.height / 2;
    const targetScale = Math.min(
      fitScaleRef.current * scaleMultiplier,
      fitScaleRef.current * 5,
    );

    const targetPanX = viewport.clientWidth / 2 - targetX * targetScale;
    const targetPanY = viewport.clientHeight / 2 - targetY * targetScale;

    setMapLocked(false);
    panzoom.zoom(targetScale, { animate: true });
    panzoom.pan(targetPanX, targetPanY, { animate: true });

    window.setTimeout(() => {
      setMapLocked(true);
      onDone?.({
        targetX,
        targetY,
        targetScale,
        panX: targetPanX,
        panY: targetPanY,
      });
    }, ZOOM_ANIMATION_MS);

    return {
      targetX,
      targetY,
      targetScale,
      panX: targetPanX,
      panY: targetPanY,
    };
  };

  const handleAreaClick = (area) => (e) => {
    e.stopPropagation();
    toggleClickedArea(area.id);
    if (area.id !== PALM_RIVER_AREA_ID || isZoomedToPalmRiver) return;

    const panzoom = panzoomRef.current;
    const viewport = viewportRef.current;
    if (!panzoom || !viewport) return;

    const targetX = PALM_RIVER_FOCUS_X;
    const targetY = PALM_RIVER_FOCUS_Y;
    const targetScale = Math.min(
      fitScaleRef.current * ZOOM_LEVEL_PALM_RIVER,
      fitScaleRef.current * 5,
    );

    const targetPanX = viewport.clientWidth / 2 - targetX * targetScale;
    const targetPanY = viewport.clientHeight / 2 - targetY * targetScale;

    setMapLocked(false);

    // Gọi zoom + pan NGAY LẬP TỨC, không setTimeout, không reset (0,0) trước.
    panzoom.zoom(targetScale, { animate: true });
    panzoom.pan(targetPanX, targetPanY, { animate: true });

    window.setTimeout(() => {
      setIsZoomedToPalmRiver(true);
      setMapLocked(true);
    }, ZOOM_ANIMATION_MS);

    palmRiverTargetRef.current = {
      targetX,
      targetY,
      targetScale,
      panX: targetPanX,
      panY: targetPanY,
    };
  };

  const handleBackToOverview = (e) => {
    e?.stopPropagation();
    const panzoom = panzoomRef.current;
    if (panzoom) {
      setMapLocked(false);
      panzoom.zoom(fitScaleRef.current, { animate: true });
      window.setTimeout(() => {
        panzoomRef.current?.pan(0, 0, { animate: true });
      }, ZOOM_ANIMATION_MS);
    }
    setIsZoomedToPalmRiver(false);

    setZoomedBuildingId(null);
    setActiveBuildingId(null);
    setHoveredBuildingId(null);
    setComingSoonId(null);
    setClickedArea(null);
  };

  // Hover chỉ highlight, KHÔNG zoom.
  const handleBuildingEnter = (_e, building) => {
    setHoveredBuildingId(building.id);
  };

  const handleBuildingLeave = () => {
    setHoveredBuildingId(null);
  };

  // ── Click toà nhà ──
  // Click lần đầu zoom camera vào toà rồi mở modal mặt bằng.
  const handleBuildingClick = (e, building) => {
    e.stopPropagation();

    const hasLayout = Boolean(building.floorImage);
    if (!hasLayout) {
      if (comingSoonTimeoutRef.current) {
        window.clearTimeout(comingSoonTimeoutRef.current);
      }
      setComingSoonId(building.id);
      comingSoonTimeoutRef.current = window.setTimeout(() => {
        setComingSoonId(null);
      }, COMING_SOON_TOOLTIP_MS);
      return;
    }

    setComingSoonId(null);

    // Nếu đã zoom sẵn vào đúng toà này thì mở modal ngay.
    if (zoomedBuildingId === building.id) {
      setActiveBuildingId(building.id);
      return;
    }

    // Click lần đầu (hoặc đang zoom toà khác) -> zoom rồi mở modal.
    const target = zoomToElement(e.currentTarget, ZOOM_LEVEL_BUILDING, () => {
      setZoomedBuildingId(building.id);
      setActiveBuildingId(building.id);
    });
    if (!target) {
      setZoomedBuildingId(building.id);
      setActiveBuildingId(building.id);
    }
  };

  const closeBuildingDetail = () => {
    handleBackToOverview();
  };

  return {
    // hover/click điểm ghim + vùng
    activeId,
    setHoverId,
    toggleClickedId,
    activeArea,
    setHoverArea,
    handleAreaClick,

    // luồng zoom Palm River / building
    isZoomedToPalmRiver,
    zoomedBuildingId,
    activeBuildingId,
    hoveredBuildingId,
    comingSoonId,
    handleBuildingEnter,
    handleBuildingLeave,
    handleBuildingClick,
    handleBackToOverview,
    closeBuildingDetail,

    // refs cần gắn vào DOM
    rootRef,
    viewportRef,
    sceneRef,
  };
}
