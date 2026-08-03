// MainContent.jsx
import React from "react";
import "./TongQuan.css";

import imgBg from "../../assets/images/main-content-bg.webp";
import reverLogo from "../../assets/images/logo-rever.png";
import TongQuanBody from "./TongQuanBody/TongQuanBody.jsx";
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
          <TongQuanBody />
          {/* <h2 className="mc__heading">
            NƠI CÂN BẰNG GIỮA THIÊN NHIÊN
            <br />
            VÀ THỊNH VƯỢNG
          </h2>
          <p className="mc__desc">
            Khu đô thị ven sông tại phường Bình Trưng, liền kề Trung tâm Tài
            chính Quốc tế Thủ Thiêm.
          </p> */}
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
