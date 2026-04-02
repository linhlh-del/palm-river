// MainContent.jsx
import React from "react";
import "./TongQuan.css";

import imgBg from "../../assets/images/main-content-bg.png";
import onePlusLogo from "../../assets/images/one-plus-logo.png";

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
    logoSub: "Đơn vị Phân phối chiến lược Masterise Homes",
  },
];

const TongQuan = React.forwardRef((props, ref) => {
  return (
    <section className="mc" id="tong-quan" ref={ref}>
      <div className="mc__body">
        {/* ── Text block ── */}
        <div className="mc__text">
          <h2 className="mc__heading">
            NƠI NHỊP ĐẬP ĐÔ THỊ
            <br />
            CỘNG HƯỞNG ĐA PHƯƠNG
          </h2>
          <p className="mc__desc">
            Được kiến tạo bởi Masterise Homes và thiết kế bởi Foster + Partners,
            The Global City được quy hoạch bài bản theo mô hình sống – làm việc
            – giải trí với hệ thống tiện ích đồng bộ. Từ tâm điểm giao lộ, một
            không gian sống đa sắc như lăng kính mở ra. Toạ độ giao thoa của
            những dòng chảy trải nghiệm, thế giới của nguồn năng lượng sáng tạo
            được khơi gợi mỗi ngày.
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
                      style={{ backgroundImage: `url(${onePlusLogo})` }}
                      aria-label="One Plus logo"
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
