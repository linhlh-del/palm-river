import React, { useEffect, useRef } from "react";
import mapImage from "../../assets/images/map1.jpg";
import sparkle from "../../assets/images/sparkle.png";
import "./Position.css";
import GetInfor from "../Getinfor/GetInfor.jsx";
import markerIcon from "../../assets/images/marker-main.png";
import MapPrimeLocation from "../MapPrime/MapPrimeLocation.jsx";

const renderDecoratedTitle = (label) => (
  <span className="title-line">
    <img src={sparkle} alt="" className="title-sparkle" />
    <span className="title-label">{label}</span>
  </span>
);

export default function Position() {
  const mapWrapRef = useRef(null);

  useEffect(() => {
    const routes = mapWrapRef.current?.querySelectorAll(".dr, .dw");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          routes?.forEach((r) => {
            r.style.animationPlayState = entry.isIntersecting
              ? "running"
              : "paused";
          });
        });
      },
      { threshold: 0.15 },
    );

    if (mapWrapRef.current) observer.observe(mapWrapRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-position" id="map">
      {/* HEADER */}
      <div className="vitri-header">
        <div className="container">
          <h2 className="title">
            {renderDecoratedTitle("TÂM ĐIỂM")}
            {renderDecoratedTitle("KẾT NỐI")}
          </h2>
          <p className="desc">
            Lợi thế tọa lạc trong khu vực phát triển trọng điểm của khu Đông
            thành phố, Palm City có hạ tầng giao thông hiện đại, thuận tiện kết
            nối mọi tiện ích một cách nhanh chóng.
          </p>
        </div>
      </div>

      {/* CARDS */}

      <div className="cards-wrap">
        <div className="vitri-cards container">
          {data.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-number">
                {item.time}
                {/* <span className="card-unit">PHÚT</span> */}
              </div>

              <div className="card-bottom">
                <div className="card-desc">
                  {Array.isArray(item.title) ? (
                    item.title.map((line, i) => (
                      <p key={i} className="card-title-line">
                        {renderDecoratedTitle(line)}
                      </p>
                    ))
                  ) : (
                      
                    <p className="card-title-line">
                      {renderDecoratedTitle(item.title)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* MAP */}
      <div className="vitri-container">
        <div className="vitri-image">
          <div className="map-wrap" ref={mapWrapRef}>
            {/* <img src={mapImage} alt="Bản đồ vị trí Masteri" /> */}
            <MapPrimeLocation />
          </div>
        </div>
      </div>
      <GetInfor style={{ backgroundColor: "#f8f2eb" }} />
    </section>
  );
}

// const data = [
//   {
//     time: "01",
//     title: [
//       "Khu phố thương mại SOHO sôi động",
//       "Kênh đào nhạc nước lớn nhất Đông Nam Á",
//     ],
//   },
//   { time: "05", title: ["Thảo Điền"] },
//   { time: "10", title: ["Trung tâm tài chính Thủ Thiêm"] },
// ];
const data = [
  {
    time: "~5 phút",
    title: [
      "GA BÌNH TRƯNG",
      "GA METRO THỦ THIÊM",
      "NÚT GIAO AN PHÚ",
      "CAO TỐC TP.HCM - LONG THÀNH - DẦU GIÂY",
      "TRƯỜNG QUỐC TẾ MỸ, ÚC",
      "KHU LIÊN HỢP THỂ THAO RẠCH CHIẾC",
    ],
  },
  {
    time: "~15 phút",
    title: [
      "TRUNG TÂM TÀI CHÍNH QUỐC TẾ THỦ THIÊM",
      "TRUNG TÂM HÀNH CHÍNH MỚI TP.HCM",
      "BỆNH VIỆN QUỐC TẾ MỸ (AIH)",
      "KHU ĐÔ THỊ SALA",
      "KHU ĐÔ THỊ AN PHÚ",
    ],
  },
  {
    time: "~30 phút",
    title: [
      "SÂN BAY QUỐC TẾ LONG THÀNH",
      "CAO TỐC BIÊN HÒA - VŨNG TÀU",
      "KHU CÔNG NGHỆ CAO TP.HCM",
      "ĐƯỜNG VÀNH ĐAI 3",
      "ĐƯỜNG VÀNH ĐAI 4",
    ],
  },
];
