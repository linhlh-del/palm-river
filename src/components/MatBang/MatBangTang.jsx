import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./MatBangTang.css";
import {
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  APARTMENT_TYPES,
  T3_2PN_GOC_CHIP,
  T3_2PN_GOC_2_CHIP,
  T3_2PN_GOC_120M_CHIP,
  T3_2PN_CHIP,
  T3_3PN_CHIP,
  T3_3PN_GOC_CHIP,
  T4_2PN_GOC_CHIP,
  T4_2PN_CHIP,
  T4_2PN_DB_CHIP,
  T4_2PN_DB_2_CHIP,
  T4_3PN_CHIP,
  T4_3PN_DB_CHIP,
  ZONES,
} from "./data";
import matBangTongThe from "../../assets/images/matbang/mat-bang-tong-the.webp";

const toDur = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}s` : v;
const toSize = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}px` : v;

// Chip luôn được kẹp cách mép khung crop tối thiểu 1 khoảng (0..1) để không
// bao giờ bị .mbt__stage (overflow:hidden) cắt mất — xem remapForCrop.
const CHIP_EDGE_PAD = 0.035;

// Tọa độ trong data.js có thể giữ theo hệ pixel gốc của ảnh.
// Khi render, pixel gốc được đổi sang % để overlay/chip/popup scale
// đồng bộ với ảnh ở mọi kích thước viewport. Giá trị %/vw/vh vẫn được giữ nguyên.
const toImagePercent = (value, total) => {
  if (value == null || value === "") return undefined;

  if (typeof value === "number" && Number.isFinite(value)) {
    return `${(value / total) * 100}%`;
  }

  if (typeof value === "string") {
    const v = value.trim();

    if (
      v.endsWith("%") ||
      v.endsWith("vw") ||
      v.endsWith("vh") ||
      v.endsWith("rem") ||
      v.endsWith("em") ||
      v.endsWith("calc(")
    ) {
      return v;
    }

    if (v.endsWith("px")) {
      const n = Number.parseFloat(v);
      if (Number.isFinite(n)) return `${(n / total) * 100}%`;
    }

    const n = Number(v);
    if (Number.isFinite(n)) return `${(n / total) * 100}%`;
  }

  return value;
};

// Tính tâm (trung bình cộng các đỉnh) của 1 polygon "x1,y1 x2,y2 ..." theo hệ
// pixel gốc của ảnh — dùng làm điểm neo cho leader-line nối chip -> zone.
// Không cần chính xác tuyệt đối (centroid hình học thật), trung bình cộng đã
// đủ tốt cho mục đích trỏ đường dẫn tới giữa căn hộ.
const getPolygonCentroid = (pointsStr) => {
  const pts = pointsStr
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(",").map(Number))
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  if (!pts.length) return null;
  const sum = pts.reduce((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0]);
  return { x: sum[0] / pts.length, y: sum[1] / pts.length };
};

// Ép style thắng tuyệt đối mọi CSS bên ngoài (kể cả !important của site),
// vì setProperty(..., "important") ở tầng inline luôn thắng class.
function useForceImportant(ref, styles, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Object.entries(styles).forEach(([prop, value]) => {
      if (value == null) return;
      try {
        el.style.setProperty(prop, value, "important");
      } catch {
        /* no-op */
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Theo dõi breakpoint mobile bằng matchMedia — chỉ dùng để bật/tắt chế độ
// "crop ảo" (mobileCrop). Không ảnh hưởng gì nếu component không truyền
// prop mobileCrop.
function useIsMobile(breakpoint) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function MatBangTang({
  imageSrc = matBangTongThe,
  imageSrcSet,
  imageSizes = "100vw",
  imageAlt = "Mặt bằng tổng thể dự án",
  zones = ZONES,
  types = APARTMENT_TYPES,
  // Danh sách mặc định gồm 12 chip độc lập; các màn hình riêng có thể truyền
  // object type của từng tòa để chỉ hiển thị chip của tòa đó.
  legendTypes = [
    T3_2PN_GOC_CHIP,
    T3_2PN_GOC_2_CHIP,
    T3_2PN_GOC_120M_CHIP,
    T3_2PN_CHIP,
    T3_3PN_CHIP,
    T3_3PN_GOC_CHIP,
    T4_2PN_GOC_CHIP,
    T4_2PN_CHIP,
    T4_2PN_DB_CHIP,
    T4_2PN_DB_2_CHIP,
    T4_3PN_CHIP,
    T4_3PN_DB_CHIP,
  ],
  onSelectZone,
  // Tốc độ: số (giây) hoặc chuỗi CSS ("1.5s", "800ms"...)
  breatheSpeed,
  transitionSpeed,
  popupSpeed,
  // Kích thước popup: số (px) hoặc chuỗi CSS ("360px", "42%"...). Popup giờ
  // chỉ còn 1 ảnh layout căn hộ (không còn cột chữ) nên chỉ cần popupWidth —
  // popupImageWidth vẫn được giữ lại để tương thích ngược, không dùng nữa.
  popupWidth,
  popupImageWidth,
  // z-index của popup SAU KHI đã portal ra document.body (thoát khỏi mọi
  // stacking context bị "nhốt" bởi isolation/transform của các component
  // cha) — mặc định rất cao để luôn nổi trên hầu hết mọi thứ. Nếu site có
  // 1 popup "báo giá"/CTA khác cần đứng trên popup này, hãy set z-index của
  // popup đó CAO HƠN giá trị dưới đây, hoặc truyền popupZIndex thấp hơn.
  popupZIndex = 999999,
  renderPopup = true,
  // Bật/tắt leader-line nối chip chú giải -> zone tương ứng trên ảnh.
  showLeaderLines = true,
  onSelectType,
  imageWidth = IMAGE_WIDTH,
  imageHeight = IMAGE_HEIGHT,
  // "Crop ảo" cho mobile: { left, right, top, bottom } (0..1). Truyền
  // MOBILE_CROP từ data.js (hoặc tự định nghĩa) để tự động zoom vào phần
  // mặt bằng chính giữa/bên phải trên màn hình hẹp — không cần cắt ảnh,
  // không cần vẽ lại zones. Để null/undefined = giữ nguyên hành vi cũ.
  mobileCrop = null,
  mobileBreakpoint = 768,
}) {
  const isMobile = useIsMobile(mobileBreakpoint);
  const [hoverZoneId, setHoverZoneId] = useState(null);
  const [hoverTypeId, setHoverTypeId] = useState(null);
  const [pinned, setPinned] = useState(false);

  const stageRef = useRef(null);
  const popupRef = useRef(null);
  const popupImageRef = useRef(null);

  const activeZone = zones.find((z) => z.id === hoverZoneId) || null;
  // Tra type theo cả `types` (6 loại của mặt bằng đang hiển thị) lẫn
  // `legendTypes` (12 chip chú giải Tháp 3 + Tháp 4) — 2 tập id độc lập,
  // không đè lên nhau nên gộp chung không lo xung đột.
  const legendEntries = Array.isArray(legendTypes)
    ? legendTypes.map((type) => [type.id, type])
    : Object.entries(legendTypes);
  const legendTypeMap = Object.fromEntries(legendEntries);
  const activeChip = activeZone?.chipId
    ? legendTypeMap[activeZone.chipId]
    : null;
  const activeType = activeChip
    ? activeChip
    : activeZone
      ? types[activeZone.typeId]
      : hoverTypeId
        ? types[hoverTypeId] || legendTypeMap[hoverTypeId]
        : null;

  const activeTypeId = activeZone
    ? activeZone.chipId || activeZone.typeId
    : hoverTypeId;
  const isSelectionActive = Boolean(hoverZoneId || hoverTypeId);

  // Zone nào ứng với 1 legend id (chipId nếu có, fallback về typeId) — dùng
  // để vẽ leader-line từ chip sang đúng (các) zone của nó.
  const zonesByLegendId = useMemo(() => {
    const map = {};
    zones.forEach((zone) => {
      const key = zone.chipId || zone.typeId;
      if (!key) return;
      if (!map[key]) map[key] = [];
      map[key].push(zone);
    });
    return map;
  }, [zones]);

  // Tâm của từng zone theo pixel gốc — tính 1 lần, dùng chung cho leader-line.
  const zoneCentroids = useMemo(() => {
    const map = {};
    zones.forEach((zone) => {
      const c = getPolygonCentroid(zone.points);
      if (c) map[zone.id] = c;
    });
    return map;
  }, [zones]);

  // --- "Crop ảo" cho mobile -------------------------------------------------
  // Chỉ bật khi có truyền mobileCrop VÀ đang ở mobile. Toán học ở đây đảm
  // bảo ảnh không bị méo (scale đều 2 chiều) — xem giải thích trong data.js.
  const activeCrop = mobileCrop && isMobile ? mobileCrop : null;
  const cropLeftFrac = activeCrop?.left ?? 0;
  const cropRightFrac = activeCrop?.right ?? 0;
  const cropTopFrac = activeCrop?.top ?? 0;
  const cropBottomFrac = activeCrop?.bottom ?? 0;
  const cropWidthFrac = 1 - cropLeftFrac - cropRightFrac;
  const cropHeightFrac = 1 - cropTopFrac - cropBottomFrac;

  // SVG chỉ "nhìn thấy" đúng vùng đã crop -> mọi polygon tự trôi theo đúng
  // vị trí tương ứng, không cần sửa 1 toạ độ nào trong ZONES.
  const viewBox = activeCrop
    ? `${cropLeftFrac * imageWidth} ${cropTopFrac * imageHeight} ${cropWidthFrac * imageWidth} ${cropHeightFrac * imageHeight}`
    : `0 0 ${imageWidth} ${imageHeight}`;

  // Khung stage được ép theo đúng tỉ lệ khung hình của vùng crop, ảnh gốc
  // sẽ được phóng to + dịch chuyển đúng bằng số học để lấp đầy khung này.
  const stageStyle = activeCrop
    ? {
        aspectRatio: `${cropWidthFrac * imageWidth} / ${cropHeightFrac * imageHeight}`,
      }
    : undefined;

  const imgStyle = activeCrop
    ? {
        position: "absolute",
        top: `${-(cropTopFrac / cropHeightFrac) * 100}%`,
        left: `${-(cropLeftFrac / cropWidthFrac) * 100}%`,
        width: `${(1 / cropWidthFrac) * 100}%`,
        maxWidth: "none",
        height: "auto",
      }
    : undefined;

  // Quy đổi vị trí % của 1 chip từ hệ toạ độ ẢNH GỐC sang hệ toạ độ VÙNG ĐÃ
  // CROP. `fraction` luôn được KẸP trong [CHIP_EDGE_PAD, 1-CHIP_EDGE_PAD] nên
  // chip KHÔNG BAO GIỜ bị crop/overflow:hidden cắt mất hay lệch ra ngoài khung
  // — trước đây chip nằm ngoài vùng crop bị ẩn hẳn (return null), giờ được
  // "ghim" vào sát mép khung hình gần nhất và luôn có leader-line nối sang
  // đúng zone để không mất chỉ dẫn. Khi không có crop (desktop / không truyền
  // mobileCrop), startFrac=0 và sizeFrac=1 nên công thức này là phép đồng
  // nhất — không ảnh hưởng gì tới hành vi cũ.
  const remapForCrop = (percentStr, startFrac, sizeFrac) => {
    const num = Number.parseFloat(percentStr);
    if (Number.isNaN(num)) {
      return { value: percentStr, visible: true, fraction: 0.5 };
    }
    const fraction = (num / 100 - startFrac) / sizeFrac;
    // "visible" = có nằm trong vùng crop hay không (dùng để biết chip có bị
    // ghim/kẹp lại hay không), khác với việc chip có được RENDER hay không —
    // giờ luôn render, chỉ đổi vị trí hiển thị.
    const visible = fraction >= 0 && fraction <= 1;
    const clampedFraction = Math.min(
      1 - CHIP_EDGE_PAD,
      Math.max(CHIP_EDGE_PAD, fraction),
    );
    return {
      value: `${clampedFraction * 100}%`,
      visible,
      fraction: clampedFraction,
    };
  };

  // Đổi 1 fraction (0..1, theo hệ toạ độ vùng đã crop) trên 1 trục thành toạ
  // độ pixel gốc của ảnh — để vẽ leader-line trong cùng hệ toạ độ với các
  // polygon zone (vốn đang ở pixel gốc) bên trong 1 <svg> duy nhất.
  const fractionToImagePx = (fraction, startFrac, sizeFrac, total) =>
    (startFrac + fraction * sizeFrac) * total;

  // Popup không còn neo theo toạ độ của 1 zone cụ thể — nó cố định 1 chỗ
  // (bên trái, giữa màn hình, canh bằng CSS position: fixed) nên chỉ cần
  // activeType có dữ liệu là hiện, không cần tìm zone để lấy vị trí nữa.
  const showPopup =
    Boolean(activeType) && (Boolean(activeZone) || Boolean(hoverTypeId));
  const popupImg = activeType?.image || "";

  // Ép cứng khung popup — chống mọi CSS/element khác đè lên.
  useForceImportant(
    popupRef,
    {
      position: "fixed",
      display: "block",
      "z-index": "999",
      "background-color": "#0b2a3d",
      overflow: "hidden",
    },
    [showPopup, hoverZoneId, hoverTypeId],
  );

  // Ép cứng ảnh layout trong popup — chỗ hay bị "lòi" ảnh/nội dung khác đè
  // lên. Popup giờ CHỈ còn ảnh (không còn cột chữ/mô tả).
  useForceImportant(
    popupImageRef,
    {
      "background-image": popupImg ? `url(${popupImg})` : "none",
      "background-size": "cover",
      "background-position": "center",
      "background-repeat": "no-repeat",
    },
    [showPopup, popupImg],
  );

  const handleZoneEnter = (zone) => () => {
    if (pinned) return;
    setHoverZoneId(zone.id);
    setHoverTypeId(null);
  };

  const handleZoneLeave = () => {
    if (pinned) return;
    setHoverZoneId(null);
  };

  const handleZoneClick = (zone) => (e) => {
    e.stopPropagation();
    if (pinned && hoverZoneId === zone.id) {
      setPinned(false);
      setHoverZoneId(null);
      return;
    }
    setHoverZoneId(zone.id);
    setHoverTypeId(null);
    setPinned(true);
    onSelectZone?.(zone);
  };

  const handleLegendEnter = (typeId) => () => {
    if (pinned) return;
    setHoverTypeId(typeId);
    setHoverZoneId(null);
  };

  const handleLegendLeave = () => {
    if (pinned) return;
    setHoverTypeId(null);
  };

  const closePopup = () => {
    setPinned(false);
    setHoverZoneId(null);
    setHoverTypeId(null);
  };

  useEffect(() => {
    if (!pinned) return;
    const onDocClick = () => closePopup();
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [pinned]);

  const rootStyle = {
    ...(breatheSpeed != null
      ? { "--mbt-zone-breathe-speed": toDur(breatheSpeed) }
      : {}),
    ...(transitionSpeed != null
      ? { "--mbt-transition-speed": toDur(transitionSpeed) }
      : {}),
    ...(popupSpeed != null
      ? { "--mbt-popup-in-speed": toDur(popupSpeed) }
      : {}),
    ...(popupWidth != null ? { "--mbt-popup-width": toSize(popupWidth) } : {}),
    ...(popupImageWidth != null
      ? { "--mbt-popup-image-width": toSize(popupImageWidth) }
      : {}),
  };

  // Trước tiên tính vị trí (đã kẹp trong khung) của TẤT CẢ legend chip sẽ
  // render, để (a) đặt chip bằng CSS % và (b) dùng lại đúng toạ độ đó (quy
  // đổi ngược ra pixel gốc) làm điểm đầu cho leader-line — đảm bảo đường nối
  // luôn bám đúng vị trí chip đang hiển thị trên màn hình, kể cả khi bị ghim
  // sát mép do crop mobile.
  const legendChips = legendEntries.map(([id, type]) => {
    const top = remapForCrop(
      toImagePercent(type.labelTop, imageHeight),
      cropTopFrac,
      cropHeightFrac,
    );
    const left = remapForCrop(
      toImagePercent(type.labelLeft, imageWidth),
      cropLeftFrac,
      cropWidthFrac,
    );
    const isActive = hoverTypeId === id || activeTypeId === id;
    const isDimmed = isSelectionActive && !isActive;
    const isPinned = !top.visible || !left.visible; // bị ghim sát mép do crop
    const targets = zonesByLegendId[id] || [];
    const anchorPx = {
      x: fractionToImagePx(
        left.fraction,
        cropLeftFrac,
        cropWidthFrac,
        imageWidth,
      ),
      y: fractionToImagePx(
        top.fraction,
        cropTopFrac,
        cropHeightFrac,
        imageHeight,
      ),
    };
    return {
      id,
      type,
      top,
      left,
      isActive,
      isDimmed,
      isPinned,
      targets,
      anchorPx,
    };
  });

  // Popup được portal thẳng ra document.body: KHÔNG nằm trong DOM con của
  // .mbt nữa nên không thể bị bất kỳ stacking context nào của các component
  // cha (isolation, transform, overflow...) "nhốt" lại làm che khuất trên
  // mobile. Bọc lại 1 lớp .mbt (dùng chung mọi CSS token/màu sắc/tốc độ có
  // sẵn) + .mbt__popup-portal (chỉ lo z-index, không chiếm layout) để popup
  // vẫn styled đúng như cũ dù đã tách khỏi cây DOM gốc.
  const popupPortal =
    renderPopup && showPopup && typeof document !== "undefined"
      ? createPortal(
          <div
            className="mbt mbt__popup-portal"
            style={{ ...rootStyle, "--mbt-popup-z-index": popupZIndex }}
          >
            <div ref={popupRef} className="mbt__popup">
              <button
                className="mbt__popup-close"
                onClick={closePopup}
                aria-label="Đóng"
              >
                ×
              </button>

              <div ref={popupImageRef} className="mbt__popup-image" />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="mbt" style={rootStyle}>
      <div ref={stageRef} className="mbt__stage" style={stageStyle}>
        <img
          className="mbt__img"
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes={imageSizes}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          style={imgStyle}
        />

        <svg
          className="mbt__overlay"
          viewBox={viewBox}
          preserveAspectRatio="none"
        >
          {zones.map((zone) => {
            const type = types[zone.typeId];
            const chipType = zone.chipId ? legendTypeMap[zone.chipId] : type;
            const isActive =
              hoverZoneId === zone.id ||
              (!hoverZoneId &&
                (hoverTypeId === zone.typeId || hoverTypeId === zone.chipId));
            const isDimmed = isSelectionActive && !isActive;
            return (
              <polygon
                key={zone.id}
                points={zone.points}
                className={`mbt__zone${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
                style={{ "--zone-color": chipType?.color || type.color }}
                tabIndex={0}
                role="button"
                aria-label={`${type.label} — ${zone.code}`}
                onMouseEnter={handleZoneEnter(zone)}
                onMouseLeave={handleZoneLeave}
                onFocus={handleZoneEnter(zone)}
                onBlur={handleZoneLeave}
                onClick={handleZoneClick(zone)}
              >
                <title>{`${type.label} — ${zone.code}`}</title>
              </polygon>
            );
          })}

          {showLeaderLines &&
            legendChips.map(
              ({ id, type, isActive, isDimmed, targets, anchorPx }) =>
                targets.map((zone) => {
                  const centroid = zoneCentroids[zone.id];
                  if (!centroid) return null;
                  return (
                    <line
                      key={`${id}-${zone.id}`}
                      x1={anchorPx.x}
                      y1={anchorPx.y}
                      x2={centroid.x}
                      y2={centroid.y}
                      className={`mbt__leader-line${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
                      style={{ "--zone-color": type.color }}
                    />
                  );
                }),
            )}
        </svg>

        {legendChips.map(
          ({ id, type, top, left, isActive, isDimmed, isPinned }) => (
            <button
              key={id}
              type="button"
              className={`mbt__legend-chip${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}${isPinned ? " is-pinned" : ""}`}
              style={{
                "--zone-color": type.color,
                top: top.value,
                left: left.value,
              }}
              onMouseEnter={handleLegendEnter(id)}
              onMouseLeave={handleLegendLeave}
              onFocus={handleLegendEnter(id)}
              onBlur={handleLegendLeave}
              onClick={(e) => {
                e.stopPropagation();
                if (pinned && hoverTypeId === id) {
                  setPinned(false);
                  setHoverTypeId(null);
                  return;
                }
                setHoverTypeId(id);
                setHoverZoneId(null);
                setPinned(true);
                onSelectType?.(id);
              }}
            >
              <span className="mbt__legend-dot" />
              {type.short}
            </button>
          ),
        )}
      </div>

      {popupPortal}
    </div>
  );
}
