import React, { useEffect, useRef, useState } from "react";
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
import bgWeb from "../../assets/images/bg-web.jpg";

const fmtArea = (m2) => `${m2} m²`;
const fmtPrice = (from, to) => `${from.toFixed(1)} – ${to.toFixed(1)} tỷ`;
const toDur = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}s` : v;
const toSize = (v) =>
  v == null ? undefined : typeof v === "number" ? `${v}px` : v;

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
  // Kích thước popup: số (px) hoặc chuỗi CSS ("360px", "42%"...)
  // popupImageWidth: bề rộng cột ảnh (trái) trong popup 2 cột — ảnh luôn
  // tỉ lệ dọc 3:4 (960x1280), cover full chiều cao popup.
  popupWidth,
  popupImageWidth,
  renderPopup = true,
  onSelectType,
  imageWidth = IMAGE_WIDTH,
  imageHeight = IMAGE_HEIGHT,
}) {
  const [hoverZoneId, setHoverZoneId] = useState(null);
  const [hoverTypeId, setHoverTypeId] = useState(null);
  const [pinned, setPinned] = useState(false);

  const stageRef = useRef(null);
  const popupRef = useRef(null);
  const popupImageRef = useRef(null);
  const popupBodyRef = useRef(null);
  const statsRef = useRef(null);

  const activeZone = zones.find((z) => z.id === hoverZoneId) || null;
  // Tra type theo cả `types` (6 loại của mặt bằng đang hiển thị) lẫn
  // `legendTypes` (12 chip chú giải Tháp 3 + Tháp 4) — 2 tập id độc lập,
  // không đè lên nhau nên gộp chung không lo xung đột.
  const legendEntries = Array.isArray(legendTypes)
    ? legendTypes.map((type) => [type.id, type])
    : Object.entries(legendTypes);
  const legendTypeMap = Object.fromEntries(legendEntries);
  const activeType = activeZone
    ? types[activeZone.typeId]
    : hoverTypeId
      ? types[hoverTypeId] || legendTypeMap[hoverTypeId]
      : null;

  const activeTypeId = activeZone ? activeZone.typeId : hoverTypeId;
  const isSelectionActive = Boolean(hoverZoneId || hoverTypeId);

  const typeZones = hoverTypeId
    ? zones.filter((z) => z.typeId === hoverTypeId)
    : [];
  const typeSummary = typeZones.length
    ? {
        count: typeZones.length,
        areaMin: Math.min(...typeZones.map((z) => z.area)),
        areaMax: Math.max(...typeZones.map((z) => z.area)),
        priceMin: Math.min(...typeZones.map((z) => z.priceFrom)),
        priceMax: Math.max(...typeZones.map((z) => z.priceTo)),
        ratio: typeZones.reduce((s, z) => s + z.ratio, 0),
      }
    : null;

  // Popup không còn neo theo toạ độ của 1 zone cụ thể — nó cố định 1 chỗ
  // (bên trái, giữa màn hình, canh bằng CSS position: fixed) nên chỉ cần
  // activeType có dữ liệu là hiện, không cần tìm zone để lấy vị trí nữa.
  const showPopup =
    Boolean(activeType) && (Boolean(activeZone) || Boolean(hoverTypeId));
  const popupImg =
    (activeZone ? activeZone.image : null) ||
    (activeType && activeType.image) ||
    "";

  // Ép cứng khung popup — chống mọi CSS/element khác đè lên.
  // (nền bg-web.jpg giờ nằm ở cột chữ — xem popupBodyRef bên dưới)
  useForceImportant(
    popupRef,
    {
      position: "fixed",
      display: "grid",
      "z-index": "999",
      "background-color": "#0b2a3d",
      overflow: "hidden",
    },
    [showPopup, hoverZoneId, hoverTypeId],
  );

  // Ép cứng ảnh layout trong popup (cột trái) — chỗ hay bị "lòi" ảnh/nội
  // dung khác đè lên.
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

  // Ép cứng nền cột chữ (bg-web.jpg + lớp phủ tối) — thắng tuyệt đối mọi
  // CSS global của site, cùng cách làm với popupImageRef.
  useForceImportant(
    popupBodyRef,
    {
      "background-image": `url(${bgWeb})`,
      "background-size": "cover",
      "background-position": "center",
      "background-repeat": "no-repeat",
    },
    [showPopup, hoverZoneId, hoverTypeId],
  );

  // Ép cứng lưới 2 cột của các chỉ số (diện tích / tỷ lệ / giá) — chỗ bị chồng chữ.
  useForceImportant(
    statsRef,
    {
      display: "grid",
      "grid-template-columns": "1fr 1fr",
    },
    [showPopup, hoverZoneId, hoverTypeId],
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

  return (
    <div className="mbt" style={rootStyle}>
      <div ref={stageRef} className="mbt__stage">
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
        />

        <svg
          className="mbt__overlay"
          viewBox={`0 0 ${imageWidth} ${imageHeight}`}
          preserveAspectRatio="none"
        >
          {zones.map((zone) => {
            const type = types[zone.typeId];
            const isActive =
              hoverZoneId === zone.id ||
              (!hoverZoneId && hoverTypeId === zone.typeId);
            const isDimmed = isSelectionActive && !isActive;
            return (
              <polygon
                key={zone.id}
                points={zone.points}
                className={`mbt__zone${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
                style={{ "--zone-color": type.color }}
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
        </svg>

        {renderPopup && showPopup && (
          <div ref={popupRef} className="mbt__popup">
            <button
              className="mbt__popup-close"
              onClick={closePopup}
              aria-label="Đóng"
            >
              ×
            </button>

            <div ref={popupImageRef} className="mbt__popup-image" />

            <div ref={popupBodyRef} className="mbt__popup-body">
              <h4 className="mbt__popup-title">{activeType.label}</h4>

              {(activeZone || typeSummary) && (
                <div ref={statsRef} className="mbt__popup-stats">
                  <div className="mbt__popup-stat">
                    <span className="mbt__popup-stat-label">Diện tích</span>
                    <span className="mbt__popup-stat-value">
                      {activeZone
                        ? fmtArea(activeZone.area)
                        : `${typeSummary.areaMin} – ${typeSummary.areaMax} m²`}
                    </span>
                  </div>
                  <div className="mbt__popup-stat">
                    <span className="mbt__popup-stat-label">Tỷ lệ căn hộ</span>
                    <span className="mbt__popup-stat-value">
                      {activeZone
                        ? `${activeZone.ratio}%`
                        : `${typeSummary.ratio}%`}
                    </span>
                  </div>
                  <div className="mbt__popup-stat mbt__popup-stat--price">
                    <span className="mbt__popup-stat-label">Giá dự kiến</span>
                    <span className="mbt__popup-stat-value">
                      {activeZone
                        ? fmtPrice(activeZone.priceFrom, activeZone.priceTo)
                        : fmtPrice(typeSummary.priceMin, typeSummary.priceMax)}
                    </span>
                  </div>
                </div>
              )}

              <p className="mbt__popup-desc">{activeType.desc}</p>
            </div>
          </div>
        )}

        {legendEntries.map(([id, type]) => {
          const isActive = hoverTypeId === id || activeTypeId === id;
          return (
            <button
              key={id}
              type="button"
              className={`mbt__legend-chip${isActive ? " is-active" : ""}`}
              style={{
                "--zone-color": type.color,
                top: toImagePercent(type.labelTop, imageHeight),
                left: toImagePercent(type.labelLeft, imageWidth),
              }}
              onMouseEnter={handleLegendEnter(id)}
              onMouseLeave={handleLegendLeave}
              onFocus={handleLegendEnter(id)}
              onBlur={handleLegendLeave}
              onClick={(e) => {
                e.stopPropagation();
                setHoverTypeId(id);
                setHoverZoneId(null);
                setPinned(true);
                onSelectType?.(id);
              }}
            >
              <span className="mbt__legend-dot" />
              {type.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
