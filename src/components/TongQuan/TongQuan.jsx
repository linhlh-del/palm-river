// MainContent.jsx
import React from "react";
import "./TongQuan.css";

import imgBg from "../../assets/images/main-content-bg.webp";
import reverLogo from "../../assets/images/logo-rever.png";

/* ── Dot SVG: node tròn trên đường line ── */
const Dot = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" fill="white" stroke="white" strokeWidth="1" />
  </svg>
);

/* ── Data rows ── */
const INFO_ROWS = [
  {
    label: "LOẠI HÌNH CĂN HỘ",
    value:
      "1PN, 1PN+, 2PN, 2PN+, 3PN, 4PN, Penthouse, Duplex, Penthouse Duplex",
  },
  {
    label: "QUY MÔ",
    value: "06 tòa tháp từ 19 – 29 tầng, 03 tầng khối đế và 02 tầng hầm",
  },
  {
    label: "HÌNH THỨC SỞ HỮU",
    value: "Sở hữu lâu dài\n(Áp dụng đối với khách hàng quốc tịch Việt Nam)",
  },
  {
    label: "ĐƠN VỊ PHÂN PHỐI",
    value: null, // dùng logo + sub-text thay vì text thuần
    hasLogo: true,
    logoSub: "Đơn vị Phân phối chiến lược Palm City",
  },
];

const TongQuan = React.forwardRef((props, ref) => {
  return (
    <section className="mc" id="tong-quan" ref={ref}>
      <div className="mc__body">
        {/* ── Text block ── */}
        <div className="mc__text">
          <h2 className="mc__heading">
            NƠI CÂN BẰNG GIỮA THIÊN NHIÊN
            <br />
            VÀ THỊNH VƯỢNG
          </h2>
          <p className="mc__desc">
            Khu đô thị ven sông tại phường Bình Trưng, liền kề Trung tâm Tài
            chính Quốc tế Thủ Thiêm.
          </p>
        </div>

        {/* ── Roadmap / Info table ── */}
        <div className="mc__info">
          {/* Đường line dọc xuyên qua tất cả dot */}
          <div className="mc__vline" />

          {INFO_ROWS.map((row, i) => (
            <div key={i} className="mc__row">
              {/* Cột TRÁI: label căn phải */}
              <div className="mc__row-left">
                <span className="mc__label">{row.label}</span>
              </div>

              {/* Cột GIỮA: dot node */}
              <div className="mc__dot-wrap">
                <Dot />
              </div>

              {/* Cột PHẢI: value/logo căn trái */}
              <div
                className="mc__row-right"
                data-label={row.label} /* dùng cho mobile ::before */
              >
                {row.value && (
                  <span className="mc__value">
                    {row.value.split("\n").map((line, j, arr) => (
                      <span key={j}>
                        {line}
                        {j < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                )}

                {row.hasLogo && (
                  <>
                    <div
                      className="mc__oneplus-logo"
                      style={{ backgroundImage: `url(${reverLogo})` }}
                      aria-label="Rever.vn"
                    />
                    {row.logoSub && (
                      <span className="mc__oneplus-sub">{row.logoSub}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background image */}
      <div
        className="mc__bg"
        style={{ backgroundImage: `url(${imgBg})` }}
        aria-hidden="true"
      />
    </section>
  );
});

TongQuan.displayName = "TongQuan";
export default TongQuan;
