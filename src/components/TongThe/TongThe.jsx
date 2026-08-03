import "./TongThe.css";
import { useState } from "react";
import matBangImg from "../../assets/images/masterplan.jpg";
import arrowImg from "../../assets/images/arrow-icon.png";
import { BUILDINGS } from "./data";

// Kích thước pixel THẬT của ảnh masterplan.jpg gốc — dùng để quy đổi
// viewBox (đơn vị pixel trên ảnh gốc) sang % hiển thị tương ứng.
const IMG_NATURAL_WIDTH = 3360;

// Tỉ lệ độ mờ (blur) chuẩn, lấy từ building-5 gốc: stdDeviation=10 trên
// viewBox rộng 276 đơn vị → tỉ lệ ~0.036. Áp tỉ lệ này cho MỌI building
// để nét glow luôn mảnh/rõ đều nhau, không phụ thuộc building to hay nhỏ.
// Muốn nét mảnh hơn nữa (rõ viền hơn) thì giảm số 10 xuống (vd 6-8);
// muốn mờ lan rộng hơn thì tăng lên.
const GLOW_BLUR_RATIO = 10 / 276;

// Độ dày viền (stroke) — tỉ lệ theo kích thước building, để viền luôn
// mảnh/dày đều nhau bất kể building to hay nhỏ. Tăng số 3 lên nếu muốn
// viền dày/sáng rực hơn, giảm xuống nếu muốn viền mảnh hơn.
const STROKE_WIDTH_RATIO = 2 / 276;

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TongThe() {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(null);

  // Touch swipe
  let _touchX = 0;
  const onTouchStart = (e) => {
    _touchX = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const diff = _touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setPage((p) =>
        diff > 0 ? Math.min(p + 1, PAGES.length - 1) : Math.max(p - 1, 0),
      );
    }
  };

  return (
    <section className="mb masterplan_site" id="mat-bang-tong-the">
      {/* ── Header: khối chữ, có nền riêng ở mobile, trong suốt ở desktop ── */}
      <div className="mb__header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-8">
              <p className="mb__cate">Khám phá</p>

              <h2 className="mb__title">MẶT BẰNG TỔNG THỂ</h2>

              <p className="mb__desc">
                Khám phá quy hoạch tổng thể được thiết kế đầy tâm huyết, nơi
                thiên nhiên, không gian sống và các tiện ích phong cách sống kết
                nối hài hòa trong một cộng đồng đô thị sôi động.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image block: ảnh masterplan + overlay building ── */}
      <div
        className="mb__image-block"
        style={{
          backgroundImage: `url(${matBangImg})`,
        }}
      >
        <div className="mb__buildings">
          {/* Glow SVG — luôn hiện */}
          {BUILDINGS.map((b) => {
            // Mỗi building có viewBox riêng (kích thước/tỉ lệ vùng khoanh khác nhau),
            // nên phải tự tính aspect-ratio theo viewBox của TỪNG building,
            // không dùng chung 1 tỉ lệ cố định (276/222 chỉ đúng cho building-5).
            const [, , vbW, vbH] = b.viewBox.split(" ").map(Number);
            // width phải tỉ lệ THẬT theo kích thước vùng khoanh trên ảnh gốc,
            // không dùng số cố định (min(380px, 18vw)) — nếu không, vùng nhỏ
            // (như building-10) sẽ bị phóng to bằng vùng lớn (building-5).
            const widthPercent = (vbW / IMG_NATURAL_WIDTH) * 100;
            // Độ mờ (blur) cũng phải tỉ lệ theo kích thước viewBox — nếu để
            // stdDeviation cố định, building nhỏ sẽ bị mờ lan rộng ra nhìn
            // như "nét vẽ bị rộng ra", còn building to lại quá mảnh.
            const blurStdDev = vbW * GLOW_BLUR_RATIO;
            const strokeWidth = vbW * STROKE_WIDTH_RATIO;
            return (
              <div
                key={b.id}
                data-id={b.id}
                className={`mb__building-glow building-${b.id}-glow`}
                style={{
                  top: b.top,
                  left: b.left,
                  width: `${widthPercent}%`,
                  aspectRatio: `${vbW} / ${vbH}`,
                }}
              >
                <svg viewBox={b.viewBox} preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter
                      id={`filter${b.id}_f_2009_202`}
                      x="-60%"
                      y="-60%"
                      width="220%"
                      height="220%"
                    >
                      {/* Làm mờ để tạo hào quang (halo) quanh viền */}
                      <feGaussianBlur stdDeviation={blurStdDev} result="blur" />
                      {/* Chồng halo mờ + viền gốc sắc nét lên trên,
                          tạo hiệu ứng "sáng viền, rõ nét" kiểu neon glow */}
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient
                      id={`paint${b.id}_linear_2009_202`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0" stopColor="#E0A83B" />
                      <stop
                        offset="0.55"
                        stopColor="#dce653"
                        stopOpacity="0.5"
                      />
                      <stop offset="1" stopColor="#D4FF00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <g
                    filter={`url(#filter${b.id}_f_2009_202)`}
                    className={`building building-${b.id}`}
                  >
                    <path
                      d={b.path}
                      fill={`url(#paint${b.id}_linear_2009_202)`}
                      fillOpacity="0.16"
                      stroke={`url(#paint${b.id}_linear_2009_202)`}
                      strokeWidth={strokeWidth}
                    />
                  </g>
                </svg>
              </div>
            );
          })}

          {/* Button — hiện khi hover */}
          {BUILDINGS.map((b) => (
            <div
              key={b.id}
              data-id={b.id}
              className={`btn-palm btn-building building-${b.id}-btn ${
                hovered === b.id ? "is-visible" : ""
              }`}
              style={{ top: b.top, left: b.left }}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <a href="#">
                <span>{b.name}</span>
                <div className="icon-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                  >
                    <path
                      d="M13.75 6.14453C11.6747 6.14453 9.84457 3.76453 8.75 0.144531"
                      stroke="#E0EDC9"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M0 6.14453L13 6.14453"
                      stroke="#E0EDC9"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M13.75 6.14453C11.6747 6.14453 9.84457 8.52453 8.75 12.1445"
                      stroke="#E0EDC9"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </div>
              </a>
            </div>
          ))}
          {/* Popup luôn hiển thị — chỉ khu vực cần chú ý, toạ độ riêng */}
          {BUILDINGS.map((b) => (
            <div
              key={`hint-${b.id}`}
              data-id={b.id}
              className={`mb__hint hint-${b.id}`}
              style={{ top: b.hintTop, left: b.hintLeft }}
            >
              <div className="mb__hint-label">{b.name}</div>
              <div className="mb__hint-imgStack">
                <img
                  src={arrowImg}
                  alt=""
                  className="mb__hint-imgBack"
                  draggable={false}
                />
                <img
                  src={arrowImg}
                  alt=""
                  className="mb__hint-imgFront"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
