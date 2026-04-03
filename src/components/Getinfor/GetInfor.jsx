import React, { useState } from "react";
import styles from "./GetInfor.module.css";

export default function GetInfor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // TODO: call API / gửi data
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          Đăng ký nhận báo giá và chính sách ưu đãi mới nhất
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Họ và tên*</label>
            <input
              type="text"
              name="name"
              placeholder="Vui lòng nhập họ và tên"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập Email (không bắt buộc)"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Số điện thoại*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Vui lòng nhập số điện thoại"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.btn}>
            NHẬN THÔNG TIN
          </button>
        </form>

        <div className={styles.hotline}>
          Hotline phòng kinh doanh: 0939 535 111
        </div>
      </div>
    </div>
  );
}
