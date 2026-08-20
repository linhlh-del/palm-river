import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopUp.module.css";
import logo from "../../assets/images/logo.png";
import projectImage from "../../assets/images/popup.jpg";
import shieldIcon from "../../assets/images/shield-half.png";
import headsetIcon from "../../assets/images/headset.png";
import Toast from "./Toast";
import { submitLead } from "../../services/leadService";
import { SITE_INFO } from "../../data/saleInfo";

const APARTMENT_TYPES = [
  "Studio",
  "Căn hộ 1 PN",
  "Căn hộ 2 PN",
  "Căn hộ 3 PN",
  "Duplex",
  "Penthouse",
  "Shophouse",
];

const HIGHLIGHTS = [
  "Trọn bộ tài liệu dự án Palm River",
  "Bản đồ vị trí, quy hoạch hạ tầng dự án",
  "Mặt bằng tổng thể và vị trí từng căn",
  "Bảng giá, bảng tính dòng tiền",
  "Chính sách bán hàng và ưu đãi",
  "Hồ sơ pháp lý: Chấp thuận CĐT, GPXD, 1/500",
];

/* ---------------------------------------------------------------------------
 * Icon set (inline SVG, không phụ thuộc file ảnh)
 * ------------------------------------------------------------------------ */
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13.5 4.5L6.5 11.5L2.5 7.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * PopupVisual — cột trái: ảnh dự án FULL từ trên xuống dưới (không còn
 * logo bar riêng), logo đã chuyển sang cột phải.
 * ------------------------------------------------------------------------ */
function PopupVisual() {
  const [broken, setBroken] = useState(false);

  return (
    <div className={styles.visual}>
      <div className={styles.visualImageWrap} data-broken={broken}>
        <img
          src={projectImage}
          alt="Phối cảnh dự án Palm River"
          onError={() => setBroken(true)}
        />
        <div className={styles.visualFallback} aria-hidden="true" />

        <div className={styles.visualCaption}>
          <PinIcon />
          <span>{SITE_INFO?.address || "Palm River"}</span>
        </div>
      </div>
    </div>
  );
}

// `initialMessage` (optional): cho phép nơi mở popup (VD: TienIch — khi bấm
// "Đăng ký nhận báo giá" từ 1 toà cụ thể) gửi kèm nội dung gợi ý vào ô
// message, thay vì luôn để trống. Không truyền thì hành vi y hệt bản gốc.
export default function PopUp({ isOpen, onClose, initialMessage = "" }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: initialMessage,
  });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Mỗi lần popup được mở lại với 1 initialMessage mới (VD: đổi toà rồi bấm
  // CTA lần nữa) thì đồng bộ lại ô message — không đụng name/phone/email
  // người dùng có thể đã gõ dở trước đó trong cùng phiên mở.
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [isOpen, initialMessage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success } = await submitLead({
      ...form,
      apartmentTypes: selectedTypes.join(", "),
      formType: "popup",
    });

    // Reset form
    setForm({ name: "", phone: "", email: "", message: "" });
    setSelectedTypes([]);
    setLoading(false);

    if (success) {
      onClose();
      navigate("/thank-you");
    } else {
      setToast({ message: "Có lỗi xảy ra, vui lòng thử lại", type: "error" });
    }
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
        <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">
          ✕
        </button>

        <div className={styles.grid}>
          {/* Cột trái: ảnh dự án full + vị trí */}
          <PopupVisual />

          {/* Cột phải: logo + nội dung + form */}
          <div className={styles.panel}>
            <img src={logo} alt="Palm River" className={styles.panelLogo} />

            <h2 className={styles.title}>
              Nhận bảng giá &amp; chính sách ưu đãi mới nhất Palm River
            </h2>

            <ul className={styles.checklist}>
              {HIGHLIGHTS.map((text) => (
                <li key={text}>
                  <span className={styles.checkIcon}>
                    <CheckIcon />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputRow}>
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
              </div>

              {/* CHECKBOX LOẠI HÌNH CĂN HỘ */}
              <div className={styles.checkboxGroup}>
                {APARTMENT_TYPES.map((type) => (
                  <label key={type} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                    />
                    <span className={styles.checkmark}></span>
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "ĐANG GỬI..." : "Đăng ký nhận thông tin"}
              </button>

              {/* CAM KẾT */}
              <div className={styles.guarantees}>
                <p>
                  <img
                    src={shieldIcon}
                    alt=""
                    className={styles.guaranteeIcon}
                  />
                  Tuyệt đối <strong>bảo mật</strong> thông tin cá nhân.
                </p>
                <p>
                  <img
                    src={headsetIcon}
                    alt=""
                    className={styles.guaranteeIcon}
                  />
                  <strong>Giải đáp mọi thắc mắc</strong> của khách hàng.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
