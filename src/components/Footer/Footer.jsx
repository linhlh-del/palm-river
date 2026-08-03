import React from "react";
import "./Footer.css";
import { FOOTER_CONTACT } from "./data";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        d="M13.75 6.14453C11.6747 6.14453 9.84457 3.76453 8.75 0.144531"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M0 6.14453L13 6.14453"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M13.75 6.14453C11.6747 6.14453 9.84457 8.52453 8.75 12.1445"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function UpArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
    >
      <path
        d="M6.14471 4.84737e-08C6.14471 2.07531 3.76471 3.90543 0.144714 5"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M6.14471 13.75L6.14471 0.750001"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M6.14471 4.42823e-07C6.14471 2.07531 8.52471 3.90543 12.1447 5"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default function Footer({ onOpenModal }) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribeClick = (event) => {
    event.preventDefault();
    if (typeof onOpenModal === "function") {
      onOpenModal();
    }
  };

  return (
    <footer className="pn-footer" id="lien-he">
      <div className="pn-container">
        <div className="pn-footer-grid">
          <div>
            <h3 className="pn-footer-heading">
              Đăng ký nhận <br /> thông tin
            </h3>
            <a
              className="pn-subscribe-btn"
              href="#"
              onClick={handleSubscribeClick}
            >
              Đăng ký <ArrowIcon />
            </a>

            <div className="pn-address-block">
              {FOOTER_CONTACT.map((row, i) => (
                <div className="pn-address-row" key={i}>
                  <p>{row.label}</p>
                  <a href={row.socialHref}>{row.socialLabel}</a>
                </div>
              ))}
            </div>

            <div className="pn-disclaimer">
              <p>
                Điều khoản miễn trừ trách nhiệm
                <br />
                Mọi thông tin và hình ảnh trên website này chỉ mang tính chất
                tham khảo và có thể được điều chỉnh mà không cần thông báo
                trước. Các thông tin chính thức sẽ được quy định cụ thể trong
                các tài liệu pháp lý và thỏa thuận liên quan.
              </p>
              <p>
                Copyright © 2026 by Palm City.
                <br />
                All rights reserved
              </p>
            </div>
          </div>

          <div className="pn-footer-right">
            <p>
              <span className="pn-gold-text">
                Không chỉ là nơi để ở, Palm City là nơi mọi giá trị sống được
                cân bằng trọn vẹn -{" "}
              </span>
              một Đô thị nghỉ dưỡng giữa lòng thành phố
            </p>

            <div className="pn-footer-bottom">
              <button
                type="button"
                className="pn-back-top"
                onClick={scrollToTop}
              >
                <span className="pn-back-top-icon">
                  <UpArrowIcon />
                </span>
                Về đầu trang
              </button>
              <div className="pn-logo-mark pn-footer-logo"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
