import React, { useEffect, useState, useRef } from "react";
import styles from "./Carousel.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png"; // đổi path nếu cần

const data = [
  { title: "HỆ THỐNG TRƯỜNG HỌC QUỐC TẾ", image: "/images/tienich/1.webp" },
  {
    title: "TRUNG TÂM TƯƠNG MẠI QUỐC TẾ 123.000 M2",
    image: "/images/tienich/2.webp",
  },
  {
    title: "KÊNH ĐÀO NHẠC NƯỚC LỚN NHẤT ĐÔNG NAM Á",
    image: "/images/tienich/3.webp",
  },
  { title: "HỆ THỐNG CÔNG VIÊN CÂY XANH", image: "/images/tienich/4.webp" },
  { title: "KHỐI ĐẾ THƯƠNG MẠI", image: "/images/tienich/5.webp" },
  { title: "KHU VỰC BBQ", image: "/images/tienich/6.webp" },
  { title: "KHÔNG GIAN CO-WORKING", image: "/images/tienich/7.webp" },
  { title: "HỒ BƠI VÔ CỰC CAO CẤP", image: "/images/tienich/8.webp" },
  { title: "PHÒNG GYM TRONG NHÀ", image: "/images/tienich/9.webp" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const listRef = useRef(null);
  const carouselRef = useRef(null);

  /* ── Tính slide width ── */
  useEffect(() => {
    const calc = () => {
      if (!carouselRef.current) return;
      const card = carouselRef.current.querySelector(`.${styles.card}`);
      const list = carouselRef.current.querySelector(`.${styles.list}`);
      if (card && list) {
        const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
        setSlideWidth(card.offsetWidth + gap);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* ── Auto slide ── */
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => p + 1), 3000);
    return () => clearInterval(id);
  }, []);

  /* ── Wrap-around ── */
  useEffect(() => {
    if (index === data.length) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 800);
      return () => clearTimeout(t);
    } else if (index === 0 && !isTransitioning) {
      setIsTransitioning(true);
    }
  }, [index, isTransitioning]);

  /* ── Manual nav ── */
  const handlePrev = () => {
    setIndex((p) => {
      if (p === 0) {
        setIsTransitioning(false);
        setTimeout(() => {
          setIsTransitioning(true);
          setIndex(data.length - 1);
        }, 0);
        return 0;
      }
      return p - 1;
    });
  };

  const handleNext = () => setIndex((p) => p + 1);

  /* Số hiển thị – khi index = data.length (clone) → hiện 1 */
  const displayIndex = index >= data.length ? 1 : index + 1;

  return (
    <section className={styles.wrapper} id="carousel">
      <h2 className={styles.title}>TIỆN ÍCH NỔI BẬT</h2>

      <div className={styles.carousel} ref={carouselRef}>
        <div
          ref={listRef}
          className={styles.list}
          style={{
            transform:
              slideWidth > 0
                ? `translateX(-${index * slideWidth}px)`
                : "translateX(0)",
            transition: isTransitioning ? "transform 0.8s ease" : "none",
          }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles.overlay}>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
          {/* Clone item đầu để loop mượt */}
          <div
            className={styles.card}
            style={{ backgroundImage: `url(${data[0].image})` }}
          >
            <div className={styles.overlay}>
              <p>{data[0].title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls: prev · counter · next ── */}
      <div className={styles.controls}>
        <button
          className={styles.arrowBtn}
          onClick={handlePrev}
          aria-label="Ảnh trước"
        >
          <img
            src={arrowIcon}
            alt=""
            className={styles.arrowImg}
            style={{ transform: "rotate(90deg)" }}
          />
        </button>

        <div className={styles.dot}>
          <span className={styles.dotCurrent}>
            {String(displayIndex).padStart(2, "0")}
          </span>
          <span className={styles.dotSep}>/</span>
          <span className={styles.dotTotal}>
            {String(data.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className={styles.arrowBtn}
          onClick={handleNext}
          aria-label="Ảnh tiếp theo"
        >
          <img
            src={arrowIcon}
            alt=""
            className={styles.arrowImg}
            style={{ transform: "rotate(-90deg)" }}
          />
        </button>
      </div>
    </section>
  );
}
