import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer} id="lien-he">
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <img
            src="/images/logo/logo-masterise.png"
            alt="logo"
            className={styles.logo}
          />

          <p className={styles.desc}>
            Được kiến tạo bởi Masterise Homes và thiết kế bởi Foster + Partners.
            The Global City được quy hoạch theo mô hình sống – làm việc – giải
            trí, mang đến không gian sống hiện đại và năng động.
          </p>
        </div>

        {/* CENTER */}
        <div className={styles.center}>
          <h3>CHUYÊN MỤC</h3>
          <span>Chính sách bảo mật</span>
          <span>Điều khoản hoạt động</span>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h3>THÔNG TIN LIÊN HỆ</h3>
          <span>Hotline: 0939 535 111</span>
          <span>Địa chỉ: The Global City, Đỗ Xuân Hợp, Quận 2, TP.HCM</span>
          <span>Đơn vị phân phối: One Plus</span>
          <span>Tên dự án: Masteri Cosmo Central</span>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className={styles.copyright}>
        <span>Copyright © 2026 - Rever. All Rights Reserved.</span>
        <div className={styles.logoSmall}></div>
      </div>
    </div>
  );
}
