import React, { useMemo, useState } from "react";
import { AREAS, AMENITY_GROUPS, POINTS } from "./TienIchData.js";
import { PALM_RIVER_BUILDINGS } from "./PalmRiverBuildingsData.js";
import MatBangTang from "../MatBang/MatBangTang";
import PopUp from "../PopUp/PopUp"; // ⚠️ sửa lại path nếu khác trong project của bạn
// import mapImage from "../../assets/images/amen-map-4.jpg";
import mapImage from "../../assets/images/map.png";
import chevronDown from "../../assets/images/chevron-down.png";
import { useTienIchMap, ROOFTOPS, getPolygonBBox } from "./useTienIchMap.js";
import "./TienIch.css";

export default function TienIch() {
  const {
    activeId,
    setHoverId,
    toggleClickedId,
    activeArea,
    isZoomedToPalmRiver,
    setHoverArea,
    handleAreaClick,

    zoomedBuildingId,
    activeBuildingId,
    hoveredBuildingId,
    comingSoonId,
    handleBuildingEnter,
    handleBuildingLeave,
    handleBuildingClick,
    handleBackToOverview,
    closeBuildingDetail,

    rootRef,
    viewportRef,
    sceneRef,
  } = useTienIchMap();

  // Đóng/mở từng nhóm trong bảng danh sách tiện ích bên phải — thuộc về UI
  // của riêng component này, không liên quan tới logic zoom nên giữ tại đây.
  const [selectedApartmentZone, setSelectedApartmentZone] = useState(null);
  const [selectedApartmentTypeId, setSelectedApartmentTypeId] = useState(null);

  // ── Popup "Đăng ký nhận báo giá" — dùng chung PopUp có sẵn của site ──
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const handleOpenQuote = () => setIsQuoteOpen(true);
  const handleCloseQuote = () => setIsQuoteOpen(false);

  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(AMENITY_GROUPS.map((group) => [group.title, true])),
  );
  const toggleGroup = (title) => {
    setExpandedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const activeBuilding = PALM_RIVER_BUILDINGS.find(
    (b) => b.id === activeBuildingId,
  );

  const formatArea = (value) => {
    if (value == null || value === "") return "—";
    const num = Number(value);
    if (Number.isNaN(num)) return "—";
    const text = Number.isInteger(num)
      ? `${num}`
      : num.toFixed(1).replace(".", ",");
    return `${text} m²`;
  };

  const formatPrice = (from, to) => {
    if (from == null && to == null) return "—";
    const fmt = (value) => {
      if (value == null || Number.isNaN(Number(value))) return "—";
      return `${Number(value).toLocaleString("vi-VN")} tỷ`;
    };
    if (from != null && to != null && from !== to) {
      return `${fmt(from)} – ${fmt(to)}`;
    }
    return fmt(from ?? to);
  };

  // ── Bảng tổng hợp TOÀN BỘ loại hình căn hộ của toà đang mở ──
  // Thay cho luồng cũ "chỉ hiện info của 1 căn/1 loại đã chọn". Diện tích ưu
  // tiên lấy từ `type.area` (số chính xác, đồng bộ theo data Mặt Bằng Tầng);
  // nếu type chưa khai báo area thì fallback tính min–max từ các zone cùng
  // typeId trong toà (giữ tương thích ngược, không bắt buộc phải điền đủ).
  const buildingTypesSummary = useMemo(() => {
    if (!activeBuilding) return [];
    const types = activeBuilding.apartmentTypes || {};

    return Object.entries(types).map(([typeId, type]) => {
      const zones = activeBuilding.zones.filter((z) => z.typeId === typeId);

      const areaText =
        type.area != null
          ? formatArea(type.area)
          : zones.length
            ? (() => {
                const areas = zones.map((z) => z.area);
                const min = Math.min(...areas);
                const max = Math.max(...areas);
                return min === max ? formatArea(min) : `${min} – ${max} m²`;
              })()
            : "—";

      const priceText = zones.length
        ? formatPrice(
            Math.min(...zones.map((z) => z.priceFrom)),
            Math.max(...zones.map((z) => z.priceTo)),
          )
        : "—";

      const isSelected =
        selectedApartmentTypeId === typeId ||
        selectedApartmentZone?.typeId === typeId;

      return {
        typeId,
        label: type.short || type.label,
        color: type.color,
        areaText,
        priceText,
        isSelected,
      };
    });
  }, [activeBuilding, selectedApartmentTypeId, selectedApartmentZone]);

  const handleSelectApartment = (zone) => {
    setSelectedApartmentZone(zone);
    setSelectedApartmentTypeId(zone.typeId);
  };

  const handleSelectApartmentType = (typeId) => {
    setSelectedApartmentZone(null);
    setSelectedApartmentTypeId(typeId);
  };

  const handleCloseBuildingDetail = (event) => {
    event?.stopPropagation();
    setSelectedApartmentZone(null);
    setSelectedApartmentTypeId(null);
    closeBuildingDetail();
  };

  const handleBackOverview = (event) => {
    setSelectedApartmentZone(null);
    setSelectedApartmentTypeId(null);
    handleBackToOverview(event);
  };

  const handleBuildingClickWithReset = (event, building) => {
    setSelectedApartmentZone(null);
    setSelectedApartmentTypeId(null);
    handleBuildingClick(event, building);
  };

  return (
    <div className="amen_site" ref={rootRef} id="tien-ich">
      <div className="map-amen" ref={viewportRef}>
        <div className="zoom-scene" ref={sceneRef}>
          {/* ================= SVG HOTSPOT 4 VÙNG + BUILDING ================= */}
          <svg
            width="1680"
            height="900"
            viewBox="0 0 1680 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1680V900H0V0Z"
              fill="url(#paint0_radial_917_3001)"
              fillOpacity="0.5"
            />

            {AREAS.map((area, idx) => (
              <g
                key={area.id}
                className={`area-map ${activeArea === area.id ? "is-active" : ""}`}
                data-id={area.id}
                style={{
                  mixBlendMode: "plus-lighter",
                  animationDelay: `${idx * 0.45}s`,
                }}
                onMouseEnter={() => setHoverArea(area.id)}
                onMouseLeave={() => setHoverArea(null)}
                onClick={handleAreaClick(area)}
              >
                <path d={area.d} fill="#D9D9D9" fillOpacity="0.01" />
                <path d={area.d} stroke="#D2FF55" strokeOpacity="0.5" />
              </g>
            ))}

            {/* clipPath riêng cho từng toà — dùng để cắt ảnh mặt bằng đúng theo
                hình dạng polygon rooftop. Luôn render, không phụ thuộc trạng
                thái zoom, vì viền + hotspot cũng hiển thị từ overview. */}
            <defs>
              {PALM_RIVER_BUILDINGS.slice(0, 4).map((building, index) => {
                const roof = ROOFTOPS[index];
                if (!roof) return null;
                return (
                  <clipPath
                    key={`clip-${building.id}`}
                    id={`clip-${building.id}`}
                  >
                    <polygon points={roof.points} />
                  </clipPath>
                );
              })}
            </defs>

            {/* ===== 4 rooftop: LUÔN hiển thị từ overview, không cần zoom trước =====
                - Viền (building-outline) chỉ sáng nhấp nháy khi toà ĐÃ có ảnh
                  mặt bằng thay thế (hasLayout) — đây là phần "mồi" thu hút click.
                - Hotspot (building-hotspot) luôn tồn tại kể cả toà chưa có ảnh,
                  để click vẫn báo được "đang cập nhật".
                - Ảnh mặt bằng chỉ hiện SAU click lần 1 (đã zoom đúng toà này). */}
            {PALM_RIVER_BUILDINGS.slice(0, 4).map((building, index) => {
              const roof = ROOFTOPS[index];
              if (!roof) return null;

              const isHovered = hoveredBuildingId === building.id;
              const isActive = activeBuildingId === building.id;
              const isZoomedHere = zoomedBuildingId === building.id;
              const isFocused = isHovered || isActive || isZoomedHere;

              const hasLayout = Boolean(building.floorImage);
              const isComingSoon = comingSoonId === building.id;
              const accentColor = hasLayout ? "#D2FF55" : "#9CA3AF";
              const bbox = getPolygonBBox(roof.points);

              // Mặt bằng trong scene chỉ dùng khi building đã được zoom.
              const showFloorImage = hasLayout && isZoomedHere;
              const imageX = building.mapPosition?.x ?? bbox.x;
              const imageY = building.mapPosition?.y ?? bbox.y;
              const imageWidth = building.mapPosition?.width ?? bbox.width;
              const imageHeight = building.mapPosition?.height ?? bbox.height;
              const imageCx = imageX + imageWidth / 2;
              const imageCy = imageY + imageHeight / 2;

              return (
                <g key={building.id}>
                  {/* Viền sáng nhấp nháy — CHỈ render cho toà đã có ảnh thay thế */}
                  {hasLayout && (
                    <polygon
                      points={roof.points}
                      className={`building-outline ${isFocused ? "is-focused" : ""}`}
                    />
                  )}

                  {showFloorImage && (
                    <image
                      href={building.floorImage}
                      x={imageX}
                      y={imageY}
                      width={imageWidth}
                      height={imageHeight}
                      transform={`rotate(${building.rotation ?? 0} ${imageCx} ${imageCy})`}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-${building.id})`}
                      style={{
                        pointerEvents: "none",
                        opacity: 1,
                        filter: "brightness(1.15) saturate(1.2)",
                        transition: "opacity 0.25s ease",
                      }}
                    />
                  )}

                  {/* Hotspot bắt sự kiện — luôn tồn tại kể cả toà chưa có ảnh */}
                  <polygon
                    className={`building-hotspot ${isHovered ? "is-hovered" : ""} ${
                      isActive ? "is-active" : ""
                    } ${!hasLayout ? "is-disabled" : ""}`}
                    points={roof.points}
                    fill={accentColor}
                    fillOpacity="0"
                    stroke="none"
                    vectorEffect="non-scaling-stroke"
                    style={{ cursor: hasLayout ? "pointer" : "not-allowed" }}
                    onMouseEnter={(e) => handleBuildingEnter(e, building)}
                    onMouseLeave={handleBuildingLeave}
                    onClick={(e) => handleBuildingClickWithReset(e, building)}
                  >
                    <title>
                      {roof.id}
                      {hasLayout ? "" : " (đang cập nhật mặt bằng)"}
                    </title>
                  </polygon>

                  {isComingSoon && (
                    <g style={{ pointerEvents: "none" }}>
                      <rect
                        x={bbox.x + bbox.width / 2 - 78}
                        y={bbox.y - 34}
                        width="156"
                        height="26"
                        rx="6"
                        fill="#1F2937"
                        fillOpacity="0.92"
                      />
                      <text
                        x={bbox.x + bbox.width / 2}
                        y={bbox.y - 16}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="12"
                      >
                        Đang cập nhật mặt bằng
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <defs>
              {AREAS.map((area) => (
                <filter
                  key={area.filterId}
                  id={area.filterId}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="25" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.822366 0 0 0 0 1 0 0 0 0 0.333872 0 0 0 0.5 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow"
                  />
                  <feGaussianBlur
                    stdDeviation="1"
                    result="effect2_foregroundBlur"
                  />
                </filter>
              ))}

              <radialGradient
                id="paint0_radial_917_3001"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(840 450) rotate(90) scale(450 840)"
              >
                <stop stopColor="#283413" stopOpacity="0" />
                <stop offset="1" stopColor="#283413" />
              </radialGradient>
            </defs>
          </svg>

          {/* ================= ẢNH NỀN BẢN ĐỒ ================= */}
          <img
            src={mapImage}
            className="img-fluid"
            alt="Sơ đồ tiện ích Palm City"
            draggable={false}
          />

          {/* ================= ĐIỂM GHIM ================= */}
          {POINTS.map((point) => (
            <div
              key={point.id}
              className={`point-element ${activeId === point.id ? "is-active" : ""}`}
              data-id={point.id}
              style={{ top: point.top, left: point.left }}
              onMouseEnter={() => setHoverId(point.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={(e) => {
                e.stopPropagation();
                toggleClickedId(point.id);
              }}
            >
              <div className="number">{point.id}</div>
              <div className="point-infor">
                <div className="d-flex align-items-center gap-2">
                  <p className="mb-0 f-title fs-48 cl-gold">{point.id}</p>
                  <p className="mb-0 fs-14 fw-400 text-uppercase">
                    {point.name}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* ================= 4 AREA POPUP ================= */}
          {AREAS.map((area, idx) => {
            const popupNumber = idx + 1;
            return (
              <div
                key={area.id}
                className={`area-popup area-popup-${popupNumber} ${
                  activeArea === area.id ? "active" : ""
                }`}
              >
                <div className="row gx-0">
                  <div className="col-md-7 col-6">
                    <div className="name-area">
                      <h5>
                        {area.popup.title.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < area.popup.title.split("\n").length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))}
                      </h5>
                    </div>
                  </div>
                  <div className="col-md-5 col-6">
                    <div className="amount-area">
                      <span className="num d-flex">
                        {area.popup.count} <span className="fs-24">+</span>
                      </span>
                      <p className="type">tiện ích</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút quay lại — nằm NGOÀI .zoom-scene nên không bị scale theo Panzoom */}
        {(isZoomedToPalmRiver || zoomedBuildingId) && (
          <button
            type="button"
            className="btn-zoom-back"
            onClick={handleBackOverview}
          >
            ← Quay lại toàn cảnh
          </button>
        )}
      </div>

      {/* ================= BẢNG DANH SÁCH TIỆN ÍCH ================= */}
      <div className="table_amenities">
        <div className="head-amen">
          <div>
            <h3
              style={{ lineHeight: "1.2em" }}
              className="f-title text-uppercase cl-gold fs-48 fw-400"
            >
              Hệ sinh thái tiện ích
            </h3>
            <p className="fs-16 fw-400 mb-0 text-uppercase f-title">
              Chuẩn nghỉ dưỡng giữa lòng thành phố
            </p>
          </div>
        </div>

        <div className="amen-scroll-wrapper">
          <div className="list-amen">
            {AMENITY_GROUPS.map((group) => {
              const isExpanded = expandedGroups[group.title] ?? true;
              return (
                <div className="section-amenities" key={group.title}>
                  <button
                    type="button"
                    className={`topic-amen mb-0 fs-16 fw-400 f-title text-uppercase ${
                      isExpanded ? "is-open" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroup(group.title);
                    }}
                  >
                    <span>{group.title}</span>
                    <img
                      src={chevronDown}
                      alt=""
                      className={`chevron-icon ${isExpanded ? "is-open" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <ul>
                      {group.items.map((item) => (
                        <li
                          key={item.id}
                          data-id={item.id}
                          className={activeId === item.id ? "is-active" : ""}
                          onMouseEnter={() => setHoverId(item.id)}
                          onMouseLeave={() => setHoverId(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleClickedId(item.id);
                          }}
                        >
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            <div className="num-amen">{item.id}</div>
                            <div className="name-amen">{item.name}</div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MODAL MẶT BẰNG TOÀ NHÀ ================= */}
      {activeBuilding && activeBuilding.floorImage && (
        <div
          className="building-detail-overlay"
          onClick={handleCloseBuildingDetail}
        >
          <button
            className="btn-close-detail"
            onClick={handleCloseBuildingDetail}
            aria-label="Đóng"
          >
            &times;
          </button>
          <div
            className="building-detail-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="building-detail-title">{activeBuilding.name}</h3>
            <div className="building-detail-columns">
              <MatBangTang
                imageSrc={activeBuilding.floorImage}
                imageAlt={`Mặt bằng ${activeBuilding.name}`}
                zones={activeBuilding.zones}
                types={activeBuilding.apartmentTypes}
                legendTypes={activeBuilding.apartmentTypes}
                onSelectZone={handleSelectApartment}
                onSelectType={handleSelectApartmentType}
                renderPopup={false}
                imageWidth={activeBuilding.viewBox.width}
                imageHeight={activeBuilding.viewBox.height}
              />

              {/* ===== CỘT PHẢI: bảng liệt kê TOÀN BỘ loại hình căn hộ của toà
                  + CTA "Đăng ký nhận báo giá" ở cuối. Thay cho luồng cũ chỉ
                  hiện thông tin của 1 căn/1 loại đã chọn. Bấm 1 dòng trong
                  bảng vẫn highlight đồng bộ với zone tương ứng trên ảnh. ===== */}
              <aside className="building-apartment-info" aria-live="polite">
                <div className="building-apartment-header">
                  <span className="building-apartment-eyebrow">
                    MẶT BẰNG CĂN HỘ ĐIỂN HÌNH
                  </span>
                  <h4>{activeBuilding.name}</h4>
                  <p className="building-apartment-sub">
                    Nhấn vào từng căn trên mặt bằng để xem vị trí tương ứng,
                    hoặc xem nhanh toàn bộ loại hình căn hộ của toà trong bảng
                    bên dưới.
                  </p>
                </div>

                <div className="apartment-type-table">
                  <div className="apartment-type-table-head">
                    <span>Loại căn hộ</span>
                    <span>Diện tích</span>
              
                  </div>
                  <div className="apartment-type-table-body">
                    {buildingTypesSummary.map((row) => (
                      <div
                        key={row.typeId}
                        className={`apartment-type-row ${
                          row.isSelected ? "is-active" : ""
                        }`}
                        style={{ "--zone-color": row.color }}
                        onClick={() => handleSelectApartmentType(row.typeId)}
                      >
                        <span className="apartment-type-name">
                          <i className="apartment-type-dot" />
                          {row.label}
                        </span>
                        <span className="apartment-type-area">
                          {row.areaText}
                        </span>
                        
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-cta-quote"
                  onClick={handleOpenQuote}
                >
                  Đăng ký nhận báo giá
                </button>
              </aside>
            </div>
          </div>
        </div>
      )}

      {/* ================= POPUP ĐĂNG KÝ NHẬN BÁO GIÁ (dùng chung của site) ================= */}
      <PopUp
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialMessage={
          activeBuilding ? `Tôi quan tâm căn hộ tại ${activeBuilding.name}` : ""
        }
      />
    </div>
  );
}
