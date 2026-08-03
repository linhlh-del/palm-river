import React from "react";
import "./TongQuanBody.css";
import imgbanner from "../../../assets/images/tongquanbody.jpg";
/**
 * TongQuanBody
 * Section "TỔNG QUAN PALM RIVER" — mô tả dự án + bảng thông số nhanh.
 * Ảnh minh họa dự án đặt bên trái, bảng thông số (dạng "nổi khối" trên nền
 * bg-web.jpg, viền vàng) đặt đè lên phần dưới ảnh giống layout Monrei mẫu.
 */
const TongQuanBody = () => {
  const overviewData = [
    { label: "Tên dự án", value: "Palm River" },
    { label: "Thuộc", value: "Palm City" },
    { label: "Chủ đầu tư", value: "Hướng Việt Properties" },
    {
      label: "Vị trí",
      value:
        "Khu Nam Rạch Chiếc, mặt tiền đường Song Hành Cao tốc TP.HCM – Long Thành – Dầu Giây, TP. Thủ Đức",
    },
    { label: "Quy mô khu đất", value: "~18.909,8 m² (≈ 1,9 ha)" },
    {
      label: "Quy mô xây dựng",
      value: "4 tòa tháp cao 36 tầng nổi + 2 tầng hầm",
    },
    {
      label: "Loại hình phát triển",
      value:
        "Căn hộ hạng sang – Shophouse – Tổ hợp khách sạn 5 sao & văn phòng hạng A",
    },
    { label: "Mật độ xây dựng", value: "Khối đế 40% – Khối tháp 25%" },
    {
      label: "Tổng diện tích sàn (GFA)",
      value: "~152.817,9 m² (bao gồm 2 tầng hầm)",
    },
    {
      label: "Số lượng sản phẩm",
      value: (
        <ul className="overview-list">
          <li>620 căn hộ hạng sang</li>
          <li>117 căn shophouse/TMDV</li>
        </ul>
      ),
    },
    { label: "Diện tích sản phẩm", value: "Từ 34,86 m² đến hơn 300 m²" },
    { label: "Dân số", value: "2.479 người" },
  ];

  return (
    <section id="tongquan" className="section section-tongquan">
      <div className="container content-container">
        <div className="text-content">
          <p className="tagline">PALM RIVER</p>
          <h1 className="section-title">
            NƠI CÂN BẰNG GIỮA THIÊN NHIÊN VÀ THỊNH VƯỢNG
          </h1>

          <p className="description">
            Palm River là dự án căn hộ cao tầng hạng sang với quy mô 1,9ha, tọa
            lạc trong khu đô thị 30,2 ha – Palm City tại khu Nam Rạch Chiếc, mặt
            tiền đường Song Hành Cao tốc TP.HCM – Long Thành – Dầu Giây, TP. Thủ
            Đức, do Hướng Việt Properties phát triển.
          </p>

          <p className="description">
            Dự án sở hữu vị trí chiến lược tại phía Đông TP.HCM, liền kề nút
            giao An Phú, Ga Metro Bình Trưng tuyến Bến Thành - Sân bay QT Long
            Thành, với lợi thế ba mặt giáp sông, chiều dài bờ sông lên đến
            2,7km.
          </p>

          <a href="#tien-ich" className="btn btn-primary mt-3 mb-4">
            KHÁM PHÁ TIỆN ÍCH
          </a>
        </div>

        <div className="image-content">
          <img
            src={imgbanner}
            alt="Palm River Tổng Quan"
            className="content-img"
          />

          <div className="overview-stats-box">
            <table className="overview-table">
              <thead>
                <tr>
                  <th colSpan={2} className="overview-table-heading">
                    TỔNG QUAN DỰ ÁN
                  </th>
                </tr>
              </thead>
              <tbody>
                {overviewData.map((row, index) => (
                  <tr key={index}>
                    <th>{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TongQuanBody;
