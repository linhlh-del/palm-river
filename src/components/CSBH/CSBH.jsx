import React, { useState } from "react";
import styles from "./CSBH.module.css";

export default function CSBH() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("DATA:", form);
    alert("Đã gửi thông tin!");
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
                <span className={styles.generated_18_152_150}>18%</span>
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

          <div className={styles.Form_152_127}>
            <div className={styles.FormContainer_152_128}>
              {/* NAME */}
              <div className={styles.Label_152_129}>
                <span className={styles.HọVàTên_152_130}>Họ và tên*</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Vui lòng nhập họ và tên"
                  className={styles.InputWpcf7FormControl_152_131}
                />
              </div>

              {/* PHONE */}
              <div className={styles.Label_152_162}>
                <span className={styles.SốĐiệnThoại_152_163}>
                  Số điện thoại*
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Vui lòng nhập số điện thoại"
                  className={styles.InputWpcf7FormControl_152_164}
                />
              </div>

              {/* EMAIL */}
              <div className={styles.Label_152_166}>
                <span className={styles.Email_152_167}>Email</span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Nhập Email (không bắt buộc)"
                  className={styles.InputWpcf7FormControl_152_168}
                />
              </div>

              {/* BUTTON */}
              <div className={styles.BtnGetInfo_152_141}>
                <div className={styles.Btn_152_170} onClick={handleSubmit}>
                  <span className={styles.NhậnThôngTin_152_142}>
                    NHẬN THÔNG TIN
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.DivElementorElement_152_143}>
              <span
                className={styles.HotlinePhòngKinhDoanh_087_719_1940_152_144}
              >
                Hotline phòng kinh doanh: 0939 535 111
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
