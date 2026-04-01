import React, { useState } from "react";
import styles from "./PositionMap.module.css";
import mapNgoaiKhu from "../../assets/images/map.jpg"; // đổi path nếu cần

export default function PositionMap() {
  const [type, setType] = useState("ngoai-khu");
  const [activeId, setActiveId] = useState(null);

  // DATA CHUẨN (1 nguồn duy nhất)
  const amenities = [
    {
      id: 1,
      name: ["Khu phố thương mại SOHO", "Kênh đào nhạc nước"],
      type: "ngoai-khu",
      position: { top: "55%", left: "60%" },
    },
    {
      id: 2,
      name: ["Thảo Điền"],
      type: "ngoai-khu",
      position: { top: "50%", left: "70%" },
    },
    {
      id: 3,
      name: ["Thủ Thiêm"],
      type: "ngoai-khu",
      position: { top: "45%", left: "65%" },
    },
    {
      id: 4,
      name: ["Bến Thành", "Nguyễn Huệ"],
      type: "ngoai-khu",
      position: { top: "40%", left: "55%" },
    },
    {
      id: 5,
      name: ["Sân bay TSN", "Long Thành"],
      type: "ngoai-khu",
      position: { top: "35%", left: "50%" },
    },

    // nội khu demo
    {
      id: 6,
      name: ["Hồ bơi trung tâm"],
      type: "noi-khu",
      position: { top: "60%", left: "40%" },
    },
    {
      id: 7,
      name: ["Công viên nội khu"],
      type: "noi-khu",
      position: { top: "50%", left: "30%" },
    },
  ];

  const filtered = amenities.filter((item) => item.type === type);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.texttitle}>
            <h2 className={styles.title}>50+</h2>
            <p className={styles.subtitle}>TIỆN ÍCH CHUẨN QUỐC TẾ</p>
          </div>
          <div className={styles.desc}>
            <p className={styles.desc}>
              Hệ tiện ích tại Masteri Cosmo Central được quy hoạch đồng bộ trong
              cùng một không gian sống, nơi các hoạt động vận động, thư giãn và
              kết nối cộng đồng diễn ra liền mạch. Mỗi tiện ích được bố trí khoa
              học, tối ưu công năng sử dụng, đáp ứng trọn vẹn nhu cầu sống, làm
              việc và tái tạo năng lượng của cư dân đô thị hiện đại.
            </p>
          </div>
        </div>

        {/* TAB */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              type === "ngoai-khu" ? styles.active : ""
            }`}
            onClick={() => setType("ngoai-khu")}
          >
            TIỆN ÍCHNGOẠI KHU
          </button>

          <button
            className={`${styles.tab} ${
              type === "noi-khu" ? styles.active : ""
            }`}
            onClick={() => setType("noi-khu")}
          >
            TIỆN ÍCH NỘI KHU
          </button>
        </div>

        {/* MAP + LIST */}
        <div className={styles.wrapper}>
          {/* MAP */}
          <div className={styles.map}>
            <img src={mapNgoaiKhu} alt="map" />

            {filtered.map((item) => (
              <div
                key={item.id}
                className={`${styles.marker} ${
                  activeId === item.id ? styles.markerActive : ""
                }`}
                style={{
                  top: item.position.top,
                  left: item.position.left,
                }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {item.id}
              </div>
            ))}
          </div>

          {/* LIST */}
          <div className={styles.list}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`${styles.item} ${
                  activeId === item.id ? styles.itemActive : ""
                }`}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <span className={styles.number}>{item.id}</span>

                <div className={styles.text}>
                  {item.name.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
