import React, { useEffect, useRef } from "react";
import mapImage from "../../assets/images/map1.jpg";
import "./Position.css";
import GetInfor from "../Getinfor/GetInfor.jsx";
import markerIcon from "../../assets/images/marker-main.png";

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

      {/* CARDS */}
      <div className="vitri-cards container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-left">
              <div className="number">{item.time}</div>
              <div className="minutes">PHÚT</div>
            </div>
            <div className="card-right">
              {Array.isArray(item.title) ? (
                item.title.map((line, i) => <p key={i}>{line}</p>)
              ) : (
                <p>{item.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MAP */}
      <div className="vitri-image">
        <div className="map-wrap" ref={mapWrapRef}>
          <img src={mapImage} alt="Bản đồ vị trí Masteri" />

          {/* SVG ROUTES */}
          <svg
            className="route-svg"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
          >
            {/* Xa Lộ Hà Nội: trái → Masteri */}
            <polyline
              className="dr dr1"
              points="132,266 156,230 172,206 186,196 200,188 216,187 226,189 266,214 282,217 288,216 380,198 440,182 482,168 500,154 514,136 512,150 520,154 582,181 600,180 640,172 652,170"
            />
            <polyline
              className="dw dw1"
              points="132,266 156,230 172,206 186,196 200,188 216,187 226,189 266,214 282,217 288,216 380,198 440,182 482,168 500,154 514,136 512,150 520,154 582,181 600,180 640,172 652,170"
            />

            {/* Cao tốc Long Thành: phải → Masteri */}
            <polyline
              className="dr dr2"
              points="648,222 656,232 670,238 700,236 720,235 756,235 780,240 800,244 844,252 870,258 940,276 986,289"
            />
            <polyline
              className="dw dw2"
              points="648,222 656,232 670,238 700,236 720,235 756,235 780,240 800,244 844,252 870,258 940,276 986,289"
            />

            {/* Mai Chí Thọ: nam → Masteri */}
            <polyline
              className="dr dr4"
              points="170,484 200,479 212,479 220,476 240,470 260,461 300,441 370,396 474,321 482,317 486,311 492,286 510,153"
            />
            <polyline
              className="dw dw4"
              points="170,484 200,479 212,479 220,476 240,470 260,461 300,441 370,396 474,321 482,317 486,311 492,286 510,153"
            />
          </svg>

          {/* MARKER CHÍNH: Masteri + Popup */}
          <div
            className="marker marker-main"
            style={{ left: "62.5%", top: "34%" }}
          >
            <div className="popup">
              <div className="popup-title">MASTERI COSMO CENTRAL</div>
              <div className="popup-row">
                <div className="popup-dot" />
                <span>01 phút đến SOHO & Kênh đào nhạc nước</span>
              </div>
              <div className="popup-row">
                <div className="popup-dot" />
                <span>05 phút đến Thảo Điền</span>
              </div>
              <div className="popup-row">
                <div className="popup-dot" />
                <span>10 phút đến Thủ Thiêm</span>
              </div>
              <div className="popup-row">
                <div className="popup-dot" />
                <span>15 phút đến Bến Thành</span>
              </div>
              <div className="popup-row">
                <div className="popup-dot" />
                <span>30 phút đến 2 sân bay quốc tế</span>
              </div>
            </div>
            <div className="pulse-wrap">
              <img src={markerIcon} alt="Masteri" className="marker-img" />
            </div>
          </div>
        </div>
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
