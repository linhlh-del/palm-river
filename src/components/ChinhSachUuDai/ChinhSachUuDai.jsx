import React, { useEffect, useState } from "react";
import styles from "./Chinhsachuudai.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";

export default function Chinhsachuudai() {
  const images = [
    "/images/CSUD/1.jpg",
    "/images/CSUD/2.jpg",
    "/images/CSUD/3.jpg",
    "/images/CSUD/4.jpg",
    "/images/CSUD/5.jpg",
    "/images/CSUD/6.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  // Auto slide — dừng khi đang zoom
  useEffect(() => {
    if (isZoomOpen) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isZoomOpen]);

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  // Zoom handlers
  const openZoom = () => {
    setZoomIndex(index);
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIndex(zoomIndex);
    setIsZoomOpen(false);
  };

  const handleZoomPrev = () =>
    setZoomIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleZoomNext = () =>
    setZoomIndex((prev) => (prev + 1) % images.length);

  // Keyboard navigation khi zoom
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

  // Khoá scroll body khi zoom
  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  const data = [
    { title: "CĂN 1PN GIÁ TỪ", price: "6,5 tỷ" },
    { title: "CĂN 1PN+ GIÁ TỪ", price: "7 tỷ" },
    { title: "CĂN 2PN GIÁ TỪ", price: "8,8 tỷ" },
    { title: "CĂN 2PN+ GIÁ TỪ", price: "10 tỷ" },
    { title: "CĂN 3PN GIÁ TỪ", price: "13 tỷ" },
    { title: "CĂN 4PN GIÁ TỪ", price: "16 tỷ" },
  ];

  return (
    <div className={styles.wrapper} id="ban-hang">
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>CHÍNH SÁCH BÁN HÀNG</h2>
          <h3 className={styles.subTitle}>Đơn giá từ 110 triệu/m2</h3>

          <div className={styles.grid}>
            {data.map((item, i) => (
              <div key={i} className={styles.card}>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardPrice}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SLIDE */}
        <div className={styles.slider}>
          <img
            src={images[index]}
            alt={`Slide ${index + 1}`}
            className={styles.image}
            onClick={openZoom}
          />

          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={handlePrev}
            aria-label="Ảnh trước"
          >
            <img
              src={arrowIcon}
              alt=""
              style={{ transform: "rotate(90deg)" }}
            />
          </button>

          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="Ảnh tiếp theo"
          >
            <img
              src={arrowIcon}
              alt=""
              style={{ transform: "rotate(-90deg)" }}
            />
          </button>

          {/* Dots */}
          <div className={styles.dots}>
            {images.map((_, i) => (
              <span
                key={i}
                className={i === index ? styles.activeDot : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
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
              src={images[zoomIndex]}
              alt={`Slide ${zoomIndex + 1}`}
              className={styles.zoomImage}
            />

            {images.length > 1 && (
              <>
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
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={i === zoomIndex ? styles.zoomActiveDot : ""}
                      onClick={() => setZoomIndex(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
