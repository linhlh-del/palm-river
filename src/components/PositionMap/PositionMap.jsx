import React, { useState, useEffect, useRef } from "react";
import styles from "./PositionMap.module.css";
import mapNgoaiKhu from "../../assets/images/map-cosmo.png";

const ITEMS_PER_COL = 5; // số item mỗi cột
const COLS_PER_SLIDE = 2; // số cột mỗi slide (mobile)
const AUTO_SLIDE_MS = 10000; // 10 giây

export default function PositionMap() {
  const [type, setType] = useState("ngoai-khu");
  const [activeId, setActiveId] = useState(null);
  const [mobileSlide, setMobileSlide] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // ── DATA ──────────────────────────────────────────────────────────────
  const amenities = [
    {
      id: 1,
      name: ["Sảnh đón"],
      type: "ngoai-khu",
      position: { top: "20%", left: "10%" },
    },
    {
      id: 2,
      name: ["Khối đế thương mại"],
      type: "ngoai-khu",
      position: { top: "8%", left: "35%" },
    },
    {
      id: 3,
      name: ["Không gian cafe ngoài trời"],
      type: "ngoai-khu",
      position: { top: "50%", left: "35%" },
    },
    {
      id: 4,
      name: ["Ghế nghỉ ngoài trời"],
      type: "ngoai-khu",
      position: { top: "33%", left: "33%" },
    },
    {
      id: 5,
      name: ["Không gian co-working"],
      type: "ngoai-khu",
      position: { top: "38%", left: "27%" },
    },
    {
      id: 6,
      name: ["Tiểu cảnh thác nước"],
      type: "ngoai-khu",
      position: { top: "38%", left: "38%" },
    },
    {
      id: 7,
      name: ["Đường dạo bộ"],
      type: "ngoai-khu",
      position: { top: "30%", left: "58%" },
    },
    {
      id: 8,
      name: ["Khu vực BBQ"],
      type: "ngoai-khu",
      position: { top: "40%", left: "60%" },
    },
    {
      id: 9,
      name: ["Khu vui chơi trẻ em"],
      type: "ngoai-khu",
      position: { top: "40%", left: "69%" },
    },
    {
      id: 10,
      name: ["Khu vui chơi trẻ em"],
      type: "ngoai-khu",
      position: { top: "35%", left: "10%" },
    },
    {
      id: 11,
      name: ["Sân thể thao"],
      type: "ngoai-khu",
      position: { top: "68%", left: "87%" },
    },
    {
      id: 12,
      name: ["Đường chạy bộ"],
      type: "ngoai-khu",
      position: { top: "47%", left: "58%" },
    },
    {
      id: 13,
      name: ["Đường xe đạp"],
      type: "ngoai-khu",
      position: { top: "52%", left: "48%" },
    },
    {
      id: 14,
      name: ["Không gian đón tiếp và thư giãn đầu khu"],
      type: "ngoai-khu",
      position: { top: "93%", left: "85%" },
    },
    {
      id: 15,
      name: ["Lounge nổi ven kênh cảnh quan"],
      type: "ngoai-khu",
      position: { top: "88%", left: "59%" },
    },
    {
      id: 16,
      name: ["Công viên thú cưng cao cấp"],
      type: "ngoai-khu",
      position: { top: "90%", left: "40%" },
    },
    {
      id: 17,
      name: ["Pavilion ngắm cảnh"],
      type: "ngoai-khu",
      position: { top: "88%", left: "20%" },
    },
    {
      id: 18,
      name: ["Không gian tiếp cận mặt nước & bến kayak riêng"],
      type: "ngoai-khu",
      position: { top: "82%", left: "8%" },
    },
    {
      id: 19,
      name: ["Thảm cỏ thiền - yoga & thái cực quyền"],
      type: "ngoai-khu",
      position: { top: "45%", left: "53%" },
    },
    {
      id: 20,
      name: ["Thảm cỏ ven sông"],
      type: "ngoai-khu",
      position: { top: "57%", left: "57%" },
    },
    {
      id: 21,
      name: ["Pavilion BBQ ngoài trời"],
      type: "ngoai-khu",
      position: { top: "60%", left: "38%" },
    },
    {
      id: 22,
      name: ["Không gian picnic ven sông"],
      type: "ngoai-khu",
      position: { top: "68%", left: "34%" },
    },
    {
      id: 23,
      name: ["Quảng trường mở trung tâm"],
      type: "ngoai-khu",
      position: { top: "65%", left: "24%" },
    },
    // ── nội khu ──
    {
      id: 24,
      name: ["Hồ bơi vô cực"],
      type: "noi-khu",
      position: { top: "16%", left: "35%" },
    },
    {
      id: 25,
      name: ["Bể sục jacuzzi"],
      type: "noi-khu",
      position: { top: "16%", left: "43%" },
    },
    {
      id: 26,
      name: ["Hồ bơi gia đình"],
      type: "noi-khu",
      position: { top: "25%", left: "41%" },
    },
    {
      id: 27,
      name: ["Khu vực tắm nắng"],
      type: "noi-khu",
      position: { top: "23%", left: "35%" },
    },
    {
      id: 28,
      name: ["Khu vực thư giãn cạnh hồ bơi"],
      type: "noi-khu",
      position: { top: "23%", left: "28%" },
    },
    {
      id: 29,
      name: ["Khu vực Yoga"],
      type: "noi-khu",
      position: { top: "30%", left: "26%" },
    },
  ];

  const filtered = amenities.filter((item) => item.type === type);

  // ── Tính slides ────────────────────────────────────────────────────────
  // Chia filtered thành các "cột" (mỗi cột ITEMS_PER_COL item)
  const totalCols = Math.ceil(filtered.length / ITEMS_PER_COL);
  // Mỗi slide chứa COLS_PER_SLIDE cột → tổng số slide
  const totalSlides = Math.ceil(totalCols / COLS_PER_SLIDE);

  // Build mảng slides: mỗi slide là mảng các cột, mỗi cột là mảng items
  const slides = Array.from({ length: totalSlides }, (_, slideIdx) => {
    const cols = [];
    for (let c = 0; c < COLS_PER_SLIDE; c++) {
      const colIdx = slideIdx * COLS_PER_SLIDE + c;
      if (colIdx >= totalCols) break; // không thêm cột trắng
      const start = colIdx * ITEMS_PER_COL;
      cols.push(filtered.slice(start, start + ITEMS_PER_COL));
    }
    return cols;
  });

  // ── Auto-slide logic ───────────────────────────────────────────────────
  const startTimer = () => {
    clearInterval(timerRef.current);
    if (totalSlides > 1) {
      timerRef.current = setInterval(() => {
        setMobileSlide((prev) => (prev + 1) % totalSlides);
      }, AUTO_SLIDE_MS);
    }
  };

  // ── Swipe handlers ────────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Chỉ xử lý swipe ngang (dx lớn hơn dy)
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) {
      // Swipe sang trái → slide tiếp theo
      setMobileSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    } else {
      // Swipe sang phải → slide trước
      setMobileSlide((prev) => Math.max(prev - 1, 0));
    }
    // Reset timer sau khi user tự lướt
    startTimer();
    touchStartX.current = null;
    touchStartY.current = null;
  };
  useEffect(() => {
    setMobileSlide(0);
  }, [type]);

  // Khởi động / restart timer khi totalSlides thay đổi
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [totalSlides, type]); // eslint-disable-line

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <section className={styles.section} id="tien-ich">
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
            className={`${styles.tab} ${type === "ngoai-khu" ? styles.active : ""}`}
            onClick={() => setType("ngoai-khu")}
          >
            TIỆN ÍCH NGOẠI KHU
          </button>
          <button
            className={`${styles.tab} ${type === "noi-khu" ? styles.active : ""}`}
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
                className={`${styles.marker}${activeId === item.id ? " " + styles.markerActive : ""}${item.type === "noi-khu" ? " " + styles.markerNoiKhu : ""}`}
                style={{ top: item.position.top, left: item.position.left }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {item.id}
              </div>
            ))}
          </div>

          {/* LIST */}
          <div className={styles.listWrapper}>
            {/* ── Desktop: danh sách thẳng (giữ nguyên) ── */}
            <div className={`${styles.list} ${styles.listDesktop}`}>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.item}${activeId === item.id ? " " + styles.itemActive : ""}`}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  <span
                    className={`${styles.number}${item.type === "noi-khu" ? " " + styles.numberNoiKhu : ""}`}
                  >
                    {item.id}
                  </span>
                  <div className={styles.text}>
                    {item.name.map((t, i) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Mobile: slide-based (tự động, không có blank col) ── */}
            <div
              className={styles.listMobile}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={styles.slideTrack}
                style={{ transform: `translateX(-${mobileSlide * 100}%)` }}
              >
                {slides.map((cols, slideIdx) => (
                  <div
                    key={slideIdx}
                    className={`${styles.slide}${cols.length === 1 ? " " + styles.slideSingle : ""}`}
                  >
                    {cols.map((colItems, colIdx) => (
                      <div key={colIdx} className={styles.slideCol}>
                        {colItems.map((item) => (
                          <div
                            key={item.id}
                            className={`${styles.item}${activeId === item.id ? " " + styles.itemActive : ""}`}
                            onMouseEnter={() => setActiveId(item.id)}
                            onMouseLeave={() => setActiveId(null)}
                          >
                            <span
                              className={`${styles.number}${item.type === "noi-khu" ? " " + styles.numberNoiKhu : ""}`}
                            >
                              {item.id}
                            </span>
                            <div className={styles.text}>
                              {item.name.map((t, i) => (
                                <p key={i}>{t}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              {totalSlides > 1 && (
                <div className={styles.slideDots}>
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`${styles.dot}${mobileSlide === idx ? " " + styles.dotActive : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
