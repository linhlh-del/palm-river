import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GetInfor.module.css";
import toast from "react-hot-toast";
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzKAY7Tvd8tZpsXyzG1TdF6Hi9OT0oC-VOr-2zdNvgvQ1qSLXNFJe9qWSvVQ_tnaf3m/exec";

export default function GetInfor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { name: "", phone: "" };

    // Validation
    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (9-11 chữ số)";
    }

    setErrors(newErrors);

    // If there are errors, don't proceed
    if (newErrors.name || newErrors.phone) {
      return;
    }

    setLoading(true);

    // Thêm dấu ' trước phone number để Google Sheet không bỏ số 0
    const dataToSend = {
      ...form,
      phone: `'${form.phone}`,
    };

    // Gửi request (fire and forget)
    try {
      fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      }).catch(() => {
        // Bỏ qua lỗi vì mode no-cors không cho phép đọc response
      });

      // Show success toast
      toast.success("Gửi thông tin thành công!");

      // Reset form
      setForm({ name: "", email: "", phone: "" });
      setErrors({ name: "", phone: "" });

      // Delay navigation to let user see success message
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          Đăng ký nhận báo giá và chính sách ưu đãi mới nhất
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label>Họ và tên*</label>
            <input
              type="text"
              name="name"
              placeholder="Vui lòng nhập họ và tên"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <span
                style={{
                  color: "#004380",
                  fontSize: "12px",
                  position: "absolute",
                  bottom: "-18px",
                  left: 0,
                }}
              >
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập Email (không bắt buộc)"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label>Số điện thoại*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Vui lòng nhập số điện thoại"
              value={form.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <span
                style={{
                  color: "#004380",
                  fontSize: "12px",
                  position: "absolute",
                  bottom: "-1.25rem",
                  left: 0,
                }}
              >
                {errors.phone}
              </span>
            )}
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "ĐANG GỬI..." : "NHẬN THÔNG TIN"}
          </button>
        </form>

        <div className={styles.hotline}>
          Hotline phòng kinh doanh: 0939 535 111
        </div>
      </div>
    </div>
  );
}
