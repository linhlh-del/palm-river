import React, { useState, useEffect, useRef } from "react";
import { AREAS, AMENITY_GROUPS, POINTS } from "./TienIchData.js";
import mapImage from "../../assets/images/amen-map-4.jpg";
import chevronDown from "../../assets/images/chevron-down.png";
import "./TienIch.css";

export default function TienIch() {
  // hoverId: chỉ có trên desktop (di chuột qua), tự tắt khi rời chuột
  // clickedId: "sticky" - bấm để bật, bấm lại / bấm ra ngoài để tắt.
  //   Đây là cái xử lý cho mobile (không có hover) và cho việc giữ popup
  //   khi user bấm vào point-element hoặc item trong danh sách.
  // activeId = cái nào đang có thì ưu tiên hiện (hover ưu tiên hơn khi cả 2 cùng có)
  const [hoverId, setHoverId] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const activeId = hoverId ?? clickedId;

  const [hoverArea, setHoverArea] = useState(null);
  const [clickedArea, setClickedArea] = useState(null);
  const activeArea = hoverArea ?? clickedArea;

  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(AMENITY_GROUPS.map((group) => [group.title, true])),
  );

  const rootRef = useRef(null);

  const toggleClickedId = (id) => {
    setClickedId((prev) => (prev === id ? null : id));
  };
  const toggleClickedArea = (id) => {
    setClickedArea((prev) => (prev === id ? null : id));
  };
  const toggleGroup = (title) => {
    setExpandedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
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

  return (
    <div className="amen_site" ref={rootRef} id="tien-ich">
      <div className="map-amen">
        {/* ================= SVG HOTSPOT 4 VÙNG ================= */}
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
                // mỗi vùng lệch nhịp nhau -> tạo hiệu ứng sóng lan thay vì nhấp nháy đồng loạt
                animationDelay: `${idx * 0.45}s`,
              }}
              onMouseEnter={() => setHoverArea(area.id)}
              onMouseLeave={() => setHoverArea(null)}
              onClick={(e) => {
                e.stopPropagation();
                toggleClickedArea(area.id);
              }}
            >
              <path d={area.d} fill="#D9D9D9" fillOpacity="0.01" />
              <path d={area.d} stroke="#D2FF55" strokeOpacity="0.5" />
            </g>
          ))}

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
        />

        {/* ================= 40 ĐIỂM GHIM ================= */}
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
                <p className="mb-0 fs-14 fw-400 text-uppercase">{point.name}</p>
              </div>
            </div>
          </div>
        ))}

        {/* ================= 4 AREA POPUP (tên vùng + số lượng) =================
            Lưu ý: số thứ tự area-popup-1..4 lấy theo THỨ TỰ HIỂN THỊ (index trong mảng AREAS),
            không phải theo data-id của SVG (data-id chỉ dùng để nối hotspot <-> popup nội bộ) */}
        {AREAS.map((area, idx) => {
          const popupNumber = idx + 1; // 1..4
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
    </div>
  );
}
