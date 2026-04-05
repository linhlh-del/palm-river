import React, { useEffect, useState, useRef } from "react";
import styles from "./Carousel.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";

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
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const carouselRef = useRef(null);
  const listRef = useRef(null);

  /* ── Tính slideWidth ── */
  const calcSlideWidth = () => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector(`.${styles.card}`);
    const list = carouselRef.current.querySelector(`.${styles.list}`);
    if (card && list) {
      const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
      setSlideWidth(card.offsetWidth + gap);
    }
  };

  useEffect(() => {
    const timer = setTimeout(calcSlideWidth, 100);
    window.addEventListener("resize", calcSlideWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calcSlideWidth);
    };
  }, []);

  /* ── Auto slide — dừng khi zoom ── */
  useEffect(() => {
    if (isZoomOpen) return;
    const id = setInterval(() => setIndex((p) => p + 1), 3000);
    return () => clearInterval(id);
  }, [isZoomOpen]);

  /* ── Wrap-around ── */
  useEffect(() => {
    if (index === data.length) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 800);
      return () => clearTimeout(t);
    }
    if (index === 0 && !isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(t);
    }
  }, [index, isTransitioning]);

  /* ── Prev / Next slide ── */
  const handlePrev = () => {
    setIndex((p) => {
      if (p === 0) {
        setIsTransitioning(false);
        setTimeout(() => {
          setIsTransitioning(true);
          setIndex(data.length - 1);
        }, 50);
        return data.length;
      }
      return p - 1;
    });
  };

  const handleNext = () => setIndex((p) => p + 1);

  /* ── Zoom handlers ── */
  const openZoom = () => {
    const realIndex = index >= data.length ? 0 : index;
    setZoomIndex(realIndex);
    setIsZoomOpen(true);
  };

  const closeZoom = () => setIsZoomOpen(false);

  const handleZoomPrev = () =>
    setZoomIndex((p) => (p - 1 + data.length) % data.length);

  const handleZoomNext = () => setZoomIndex((p) => (p + 1) % data.length);

  /* ── Keyboard khi zoom ── */
  useEffect(() => {
    if (!isZoomOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeZoom();
      if (e.key === "ArrowLeft") handleZoomPrev();
      if (e.key === "ArrowRight") handleZoomNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isZoomOpen, zoomIndex]);

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  const displayIndex = index >= data.length ? 1 : index + 1;

  return (
    <section className={styles.wrapper} id="carousel">
      <h2 className={styles.title}>TIỆN ÍCH NỔI BẬT</h2>

      <div className={styles.carousel} ref={carouselRef}>
        <div
          ref={listRef}
          className={styles.list}
          style={{
            transform: `translateX(-${index * slideWidth}px)`,
            transition: isTransitioning ? "transform 0.8s ease" : "none",
          }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ backgroundImage: `url(${item.image})` }}
              onClick={openZoom}
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
            onClick={openZoom}
          >
            <div className={styles.overlay}>
              <p>{data[0].title}</p>
            </div>
          </div>
        </div>
      </div>

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

      {/* ZOOM MODAL */}
      {isZoomOpen && (
        <div className={styles.zoomOverlay} onClick={closeZoom}>
          <div
            className={styles.zoomModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.zoomCloseBtn} onClick={closeZoom}>
              ✕
            </button>

            <img
              src={data[zoomIndex].image}
              alt={data[zoomIndex].title}
              className={styles.zoomImage}
            />

            <div className={styles.zoomCaption}>{data[zoomIndex].title}</div>

            <button
              className={`${styles.zoomArrow} ${styles.zoomArrowLeft}`}
              onClick={handleZoomPrev}
            >
              <img
                src={arrowIcon}
                alt="prev"
                style={{ transform: "rotate(90deg)" }}
              />
            </button>
            <button
              className={`${styles.zoomArrow} ${styles.zoomArrowRight}`}
              onClick={handleZoomNext}
            >
              <img
                src={arrowIcon}
                alt="next"
                style={{ transform: "rotate(-90deg)" }}
              />
            </button>

            <div className={styles.zoomDots}>
              {data.map((_, i) => (
                <span
                  key={i}
                  className={i === zoomIndex ? styles.zoomActiveDot : ""}
                  onClick={() => setZoomIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
