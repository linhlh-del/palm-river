import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CSBH.module.css";
import toast from "react-hot-toast";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzgYpSnaUB7vn7hmXMRuuEUF9J9bPu2UR5VxN2Rbi-AJTlRJAk5yW0aPNf-XDW-Rk95MA/exec";

export default function CSBH() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
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
      setForm({ name: "", phone: "", email: "" });
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
    <div className={styles.SectionCsbh_152_96} id="uu-dai">
      <div className={styles.Content_152_97}>
        {/* TITLE */}
        <div className={styles.Title_152_98}>
          <span className={styles.title}>CHÍNH SÁCH ƯU ĐÃI</span>
        </div>

        {/* LIST ƯU ĐÃI */}
        <div className={styles.Content_152_100}>
          <div className={styles.List_152_101}>
            <div className={styles.Card_152_102}>
              <div className={styles.Title_152_103}>
                <span className={styles.MiễnPhíQuảnLý_152_104}>
                  Miễn phí quản lý
                </span>
              </div>
              <div className={styles.Main_152_105}>
                <span className={styles.generated_02_152_106}>02</span>
              </div>
              <div className={styles.Text_152_107}>
                <span className={styles.Năm_152_108}>năm</span>
              </div>
            </div>

            <div className={styles.Card_152_146}>
              <div className={styles.Title_152_147}>
                <span className={styles.TổngChiếtKhấuĐến_152_148}>
                  Tổng chiết khấu đến
                </span>
              </div>
              <div className={styles.Main_152_149}>
                <span className={styles.generated_18_152_150}>16,85%</span>
              </div>
              <div className={styles.Text_152_151}>
                <span className={styles.BookingSớmThanhToánSớm_152_152}>
                  (Booking sớm & thanh toán sớm)
                </span>
              </div>
            </div>

            <div className={styles.Card_152_154}>
              <div className={styles.Title_152_155}>
                <span className={styles.nHạnGốcLãiĐến_152_156}>
                  Ân hạn gốc lãi đến
                </span>
              </div>
              <div className={styles.Main_152_157}>
                <span className={styles.generated_2029_152_158}>2029</span>
              </div>
              <div className={styles.Text_152_159}>
                <span className={styles.VayTốiĐa_70_152_160}>
                  Vay tối đa 70%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className={styles.FormGetInfo_152_123}>
          <div className={styles.DivElementorElement_152_124}>
            <div className={styles.Title_152_125}>
              <span
                className={styles.NhậnTưVấnƯuĐãiVàPhươngÁnMuaTốtNhất_152_126}
              >
                NHẬN TƯ VẤN ƯU ĐÃI VÀ PHƯƠNG ÁN MUA TỐT NHẤT
              </span>
            </div>
          </div>

          <form className={styles.Form_152_127} onSubmit={handleSubmit}>
            <div className={styles.FormContainer_152_128}>
              {/* NAME */}
              <div
                className={styles.Label_152_129}
                style={{ position: "relative" }}
              >
                <span className={styles.HọVàTên_152_130}>Họ và tên*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Vui lòng nhập họ và tên"
                  className={styles.InputWpcf7FormControl_152_131}
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

              {/* PHONE */}
              <div
                className={styles.Label_152_162}
                style={{ position: "relative" }}
              >
                <span className={styles.SốĐiệnThoại_152_163}>
                  Số điện thoại*
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Vui lòng nhập số điện thoại"
                  className={styles.InputWpcf7FormControl_152_164}
                  required
                />
                {errors.phone && (
                  <span
                    style={{
                      color: "#004380",
                      fontSize: "12px",
                      position: "absolute",
                      bottom: "-18px",
                      left: 0,
                    }}
                  >
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className={styles.Label_152_166}>
                <span className={styles.Email_152_167}>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Nhập Email (không bắt buộc)"
                  className={styles.InputWpcf7FormControl_152_168}
                />
              </div>

              {/* BUTTON */}
              <div className={styles.BtnGetInfo_152_141}>
                <button
                  type="submit"
                  className={styles.Btn_152_170}
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <span className={styles.NhậnThôngTin_152_142}>
                    {loading ? "ĐANG GỬI..." : "NHẬN THÔNG TIN"}
                  </span>
                </button>
              </div>
            </div>

            <div className={styles.DivElementorElement_152_143}>
              <span
                className={styles.HotlinePhòngKinhDoanh_087_719_1940_152_144}
              >
                Hotline phòng kinh doanh: 0939 535 111
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
