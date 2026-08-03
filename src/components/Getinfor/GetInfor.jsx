import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GetInfor.module.css";
import toast from "react-hot-toast";
import { submitLead } from "../../services/leadService"; // chỉnh path cho đúng vị trí thực tế trong dự án

const APARTMENT_TYPES = [
  "Căn Studio",
  "Căn 1 Phòng Ngủ",
  "Căn 2 Phòng Ngủ",
  "Căn 3 Phòng Ngủ",
  "Garden House",
  "Shophouse Khối Đế",
];

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

    const { success } = await submitLead(form);

    if (success) {
      toast.success("Gửi thông tin thành công!");

      // Reset form
      setForm({ name: "", email: "", phone: "" });
      setErrors({ name: "", phone: "" });

      // Delay navigation to let user see success message
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }

    setLoading(false);
  };

  return (
    <div className={styles.wrapperContainer}>
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
            <div className={styles.inputGroup} style={{ position: "relative" }}>
              <label>Nhu cầu</label>
              <select
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="" disabled hidden>
                  Chọn loại hình căn hộ (không bắt buộc)
                </option>
                {APARTMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "ĐANG GỬI..." : "NHẬN THÔNG TIN"}
            </button>
          </form>

          <div className={styles.hotline}>
            {/* Hotline phòng kinh doanh: 0869 702 321 */}
          </div>
        </div>
      </div>
    </div>
  );
}
