import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GetInfor.module.css";
import toast from "react-hot-toast";
import { submitLead } from "../../services/leadService";

const APARTMENT_TYPES = [
  "Studio",
  "Căn hộ 1 PN",
  "Căn hộ 2 PN",
  "Căn hộ 3 PN",
  "Duplex",
  "Penthouse",
  "Shophouse",
];

export default function GetInfor({
  showTitle = true,
  title,
  embedded = false,
  formType = "getinfor",
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    apartmentType: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const cx = (base) => (embedded ? `${base} ${styles.embedded}` : base);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { name: "", phone: "" };

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (9-11 chữ số)";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) {
      return;
    }

    setLoading(true);

    const { success } = await submitLead({
      name: form.name,
      phone: form.phone,
      apartmentTypes: form.apartmentType,
      formType,
    });

    if (success) {
      toast.success("Gửi thông tin thành công!");
      setForm({ name: "", apartmentType: "", phone: "" });
      setErrors({ name: "", phone: "" });
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }

    setLoading(false);
  };

  return (
    <div className={cx(styles.wrapperContainer)}>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.container)}>
          {showTitle && (
            <div className={cx(styles.title)}>
              {title || "Đăng ký nhận báo giá và chính sách ưu đãi mới nhất"}
            </div>
          )}

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
                name="apartmentType"
                value={form.apartmentType}
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
