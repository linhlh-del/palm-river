import "./TongThe.css";
import { useState } from "react";
import matBangImg from "../../assets/images/masterplan.jpg";
import arrowImg from "../../assets/images/arrow-icon.png";
// ── Data building/tiện ích trên mặt bằng ─────────────────────────────────────
const BUILDINGS = [
  {
    id: "5",
    name: "palm river",
    top: "74%",
    left: "32%",
    hintTop: "66%", // ← toạ độ riêng của popup hint, chỉnh tuỳ ý
    hintLeft: "32%", // ← toạ độ riêng của popup hint, chỉnh tuỳ ý
    viewBox: "392 667 276 222",
    path: "M622.5 687L638.5 691.5L640 692L641.5 824L645.5 829V839L648 849.5L541.5 868.5L521 863.5L484 858L472 859.5L427 854.5L420.5 719.5L412 714V701L414 695H469.5L474.5 826H482.5L478.5 698L487.5 696.5H533L537 837L554.5 835.5L550.5 696.5L601 693V689L622.5 687Z",
  },
];

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
          {BUILDINGS.map((b) => (
            <div
              key={b.id}
              data-id={b.id}
              className={`mb__building-glow building-${b.id}-glow`}
            >
              <svg viewBox={b.viewBox} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter
                    id={`filter${b.id}_f_2009_202`}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="10" result="blur" />
                  </filter>
                  <linearGradient
                    id={`paint${b.id}_linear_2009_202`}
                    x1="412"
                    y1="687"
                    x2="648"
                    y2="868.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E6CE9E" />
                    <stop offset="1" stopColor="#D2B57C" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g
                  filter={`url(#filter${b.id}_f_2009_202)`}
                  className={`building building-${b.id}`}
                  style={{ mixBlendMode: "soft-light" }}
                >
                  <path
                    d={b.path}
                    fill={`url(#paint${b.id}_linear_2009_202)`}
                  />
                </g>
              </svg>
            </div>
          ))}

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
