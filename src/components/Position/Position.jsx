import React from "react";
import mapImage from "../../assets/images/map.jpg";
import "./Position.css";
import GetInfor from "../Getinfor/GetInfor.jsx";
export default function Position() {
  return (
    <section className="section-position">
      {/* HEADER */}
      <div className="vitri-header">
        <div className="container">
          <h2 className="title">
            <span>GIAO ĐIỂM</span>
            <span>KẾT NỐI</span>
          </h2>

          <p className="desc">
            Tọa lạc ngay điểm giao thoa chiến lược, kế cận hệ tiện ích thương
            mại – giải trí – giao thương sôi động của khu đô thị quốc tế The
            Global City, Masteri Cosmo Central giúp cư dân kết nối mọi trải
            nghiệm nội khu chỉ trong 5 phút. Mỗi nhịp sống đều đề cao hiệu năng,
            cân bằng trọn vẹn: sống – làm việc – thư giãn trong cùng một bán
            kính tiện nghi.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="vitri-cards container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="left">
              <div className="number">{item.time}</div>
              <div className="minutes">PHÚT</div>
            </div>

            <div className="right">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE */}
      <div className="vitri-image">
        <img src={mapImage} alt="map" />
      </div>

      <GetInfor style={{ backgroundColor: "#f8f2eb" }} />
    </section>
  );
}

const data = [
  {
    time: "01",
    title: [
      "Khu phố thương mại SOHO sôi động",
      "Kênh đào nhạc nước lớn nhất Đông Nam Á",
    ],
  },
  { time: "05", title: ["Thảo Điền"] },
  { time: "10", title: ["Trung tâm tài chính Thủ Thiêm"] },
  { time: "15", title: ["Trung tâm Phường Bến Thành", "Phố đi bộ Nguyễn Huệ"] },
  { time: "30", title: ["Sân bay Tân Sơn Nhất", "Sân bay quốc tế Long Thành"] },
];
