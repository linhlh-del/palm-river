import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopUp.module.css";
import logoLusso from "../../assets/images/logo-oneplus.png";
import Toast from "./Toast";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzKAY7Tvd8tZpsXyzG1TdF6Hi9OT0oC-VOr-2zdNvgvQ1qSLXNFJe9qWSvVQ_tnaf3m/exec";
export default function PopUp({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Thêm dấu ' trước phone number để Google Sheet không bỏ số 0
    const dataToSend = {
      ...form,
      phone: `'${form.phone}`,
    };

    // Gửi request mà không cần đợi response (fire and forget)
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors", // bắt buộc với Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    }).catch(() => {
      // Bỏ qua lỗi vì mode no-cors không cho phép đọc response
    });

    // Reset form
    setForm({ name: "", phone: "", email: "", message: "" });
    setLoading(false);

    // Navigate to thank you page
    onClose();
    navigate("/thank-you");
  };

  if (!isOpen) return null;

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.container}>
          {/* Logo */}
          <img src={logoLusso} alt="Lusso Saigon" className={styles.logo} />

          {/* Title */}
          <h2>NHẬN BẢNG GIÁ VÀ CHÍNH SÁCH MỚI NHẤT MASTERISE COSMO CENTRAL</h2>

          <p>
            Để tiết kiệm thời gian tìm hiểu dự án, vui lòng để lại thông tin.
            Chuyên viên sẽ liên hệ ngay cho bạn.
          </p>

          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Nội dung / Lời nhắn"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "ĐANG GỬI..." : "ĐĂNG KÝ"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
