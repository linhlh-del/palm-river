import React from "react";
import styles from "./ThankYou.module.css";
import logo from "../../assets/images/logo-oneplus.png";

export default function ThankYou({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.container}>
          {/* Logo */}
          <img src={logo} alt="Cosmo Central" className={styles.logo} />

          {/* Success Icon */}
          <div className={styles.successIcon}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M28 42L36 50L52 30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Title */}
          <h2>CẢM ƠN BẠN!</h2>

          <p>
            Chúng tôi đã nhận được thông tin của bạn. Một chuyên viên sẽ liên hệ
            với bạn trong thời gian sớm nhất để tư vấn chi tiết về dự án{" "}
            <strong>Masterise Cosmo Central</strong>.
          </p>

          <div className={styles.infoBox}>
            <p className={styles.infoTitle}>Bạn sẽ nhận được:</p>
            <ul>
              <li>✓ Bảng giá chi tiết mới nhất</li>
              <li>✓ Chính sách hỗ trợ đặc biệt</li>
              <li>✓ Tư vấn miễn phí từ chuyên viên</li>
            </ul>
          </div>

          {/* CTA Button */}
          <button className={styles.ctaBtn} onClick={onClose}>
            QUAY LẠI TRANG CHỦ
          </button>

          {/* Contact Info */}
          <p className={styles.contactInfo}>
            Nếu bạn có thắc mắc gấp, vui lòng gọi cho chúng tôi: <br />
            <strong>0877 191 940</strong>
          </p>
        </div>
      </div>
    </>
  );
}
