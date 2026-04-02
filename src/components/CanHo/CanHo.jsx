import React, { useState, useEffect } from "react";
import styles from "./CanHo.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";

// ── Import ảnh tĩnh → Vite hash + optimize lúc build, không bị 404 trên Vercel
import img1pn_1 from "/images/canho/1.jpg";
import img1pn_2 from "/images/canho/2.jpg";
import img1pn_3 from "/images/canho/3.jpg";

import img2pn_1 from "/images/canho/1.jpg";
import img2pn_2 from "/images/canho/2.jpg";
import img2pn_3 from "/images/canho/3.jpg";
import img2pn_4 from "/images/canho/4.jpg";
import img2pn_5 from "/images/canho/5.jpg";

import img3pn_1 from "/images/canho/1.jpg";
import img3pn_2 from "/images/canho/2.jpg";
import img3pn_3 from "/images/canho/3.jpg";
import img3pn_4 from "/images/canho/4.jpg";

// ── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "1pn",
    label: "Căn hộ 1PN",
    price: "7,3 tỷ", // TODO: cập nhật giá thật
    specs: [
      { label: "Diện tích thông thủy (NFA)", value: "46.59–55.51m²" },
      { label: "Diện tích sàn thực (NSA)", value: "41.52–49.86m²" },
      { label: "Pháp lý", value: "Sổ hồng riêng" },
      { label: "Sở hữu", value: "Lâu dài" },
      { label: "Bàn giao", value: "Năm 2026" },
      { label: "Nội thất", value: "Hoàn thiện cao cấp" },
    ],
    images: [img1pn_1, img1pn_2, img1pn_3],
  },
  {
    id: "2pn",
    label: "Căn hộ 2PN",
    price: "12,5 tỷ", // TODO: cập nhật giá thật
    specs: [
      { label: "Diện tích thông thủy (NFA)", value: "72.10–85.40m²" },
      { label: "Diện tích sàn thực (NSA)", value: "65.20–77.50m²" },
      { label: "Pháp lý", value: "Sổ hồng riêng" },
      { label: "Sở hữu", value: "Lâu dài" },
      { label: "Bàn giao", value: "Năm 2026" },
      { label: "Nội thất", value: "Hoàn thiện cao cấp" },
    ],
    images: [img2pn_1, img2pn_2, img2pn_3, img2pn_4, img2pn_5],
  },
  {
    id: "3pn",
    label: "Căn hộ 3PN",
    price: "18,9 tỷ", // TODO: cập nhật giá thật
    specs: [
      { label: "Diện tích thông thủy (NFA)", value: "105.0–128.5m²" },
      { label: "Diện tích sàn thực (NSA)", value: "95.2–116.8m²" },
      { label: "Pháp lý", value: "Sổ hồng riêng" },
      { label: "Sở hữu", value: "Lâu dài" },
      { label: "Bàn giao", value: "Năm 2026" },
      { label: "Nội thất", value: "Hoàn thiện cao cấp" },
    ],
    images: [img3pn_1, img3pn_2, img3pn_3, img3pn_4],
  },
];

// ── Preload ảnh kế tiếp để chuyển slide không bị giật ────────────────────────
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

// ── Sub-component: Left panel thông tin căn hộ ───────────────────────────────
function AptInfo({ tab }) {
  return (
    <div className={styles.aptInfo}>
      <h3 className={styles.aptTitle}>{tab.label}</h3>
      <div className={styles.aptDivider} />

      <div className={styles.priceBox}>
        <p className={styles.priceLabel}>GIÁ BÁN DỰ KIẾN</p>
        <p className={styles.priceValue}>{tab.price}</p>
      </div>

      <p className={styles.specTitle}>THÔNG SỐ KỸ THUẬT</p>
      <div className={styles.specGrid}>
        {tab.specs.map((s, i) => (
          <div key={i} className={styles.specCard}>
            <span className={styles.specCardLabel}>{s.label}</span>
            <span className={styles.specCardValue}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CanHo({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState("1pn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);

  const activeTabData = TABS.find((t) => t.id === activeTab);
  const currentImages = activeTabData.images;

  // Preload toàn bộ ảnh của tab active
  useEffect(() => {
    currentImages.forEach((src) => preloadImage(src));
  }, [activeTab]);

  // Preload prev/next liên tục
  useEffect(() => {
    const next = currentImages[(currentIndex + 1) % currentImages.length];
    const prev =
      currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ];
    preloadImage(next);
    preloadImage(prev);
  }, [currentIndex, currentImages]);

  // Fade out → đổi ảnh → fade in
  const changeSlide = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
    }, 180);
  };

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;
    setFade(false);
    setTimeout(() => {
      setActiveTab(tabId);
      setCurrentIndex(0);
      setFade(true);
    }, 180);
  };

  const handlePrev = () => {
    changeSlide(
      currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1,
    );
  };

  const handleNext = () => {
    changeSlide(
      currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const openZoom = () => {
    setIsZoomOpen(true);
    setZoomImageIndex(currentIndex);
  };

  const closeZoom = () => {
    // Sync carousel với vị trí đang xem trong zoom khi đóng
    setCurrentIndex(zoomImageIndex);
    setIsZoomOpen(false);
  };

  const handleZoomPrev = () => {
    setZoomImageIndex(
      zoomImageIndex === 0 ? currentImages.length - 1 : zoomImageIndex - 1,
    );
  };

  const handleZoomNext = () => {
    setZoomImageIndex(
      zoomImageIndex === currentImages.length - 1 ? 0 : zoomImageIndex + 1,
    );
  };

  // Keyboard navigation cho zoom modal
  useEffect(() => {
    if (!isZoomOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeZoom();
      if (e.key === "ArrowLeft") handleZoomPrev();
      if (e.key === "ArrowRight") handleZoomNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isZoomOpen, zoomImageIndex]);

  // Lock scroll khi zoom modal mở
  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  return (
    <section className={styles.section} id="can-ho">
      <div className={styles.container}>
        {/* ── Title ── */}
        <div className={styles.header}>
          <h2>MẶT BẰNG CĂN HỘ</h2>
        </div>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Body: left info + right carousel ── */}
        <div className={styles.carouselWrapper}>
          {/* LEFT — thông tin căn hộ */}
          <AptInfo tab={activeTabData} />

          {/* RIGHT — tabs + slide ảnh */}
          <div className={styles.carouselRight}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <img
                key={`${activeTab}-${currentIndex}`}
                src={currentImages[currentIndex]}
                alt={`${activeTabData.label} - ảnh ${currentIndex + 1}`}
                className={`${styles.slideImg} ${fade ? styles.fadeIn : styles.fadeOut}`}
                loading="lazy"
                decoding="async"
                onClick={openZoom}
              />

              {/* Prev arrow */}
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

              {/* Next arrow */}
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
                {currentImages.map((_, index) => (
                  <span
                    key={index}
                    className={index === currentIndex ? styles.activeDot : ""}
                    onClick={() => changeSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <button onClick={() => onOpenModal?.()}>NHẬN BÁO GIÁ CHI TIẾT</button>
        </div>

        {/* ── Zoom Modal ── */}
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
                src={currentImages[zoomImageIndex]}
                alt={`${activeTabData.label} - Chi tiết`}
                className={styles.zoomImage}
              />

              {currentImages.length > 1 && (
                <>
                  <button
                    className={`${styles.zoomArrow} ${styles.zoomArrowLeft}`}
                    onClick={handleZoomPrev}
                  >
                    <img
                      src={arrowIcon}
                      alt="prev"
                      style={{ transform: "scaleX(1)" }}
                    />
                  </button>

                  <button
                    className={`${styles.zoomArrow} ${styles.zoomArrowRight}`}
                    onClick={handleZoomNext}
                  >
                    <img
                      src={arrowIcon}
                      alt="next"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </button>

                  <div className={styles.zoomDots}>
                    {currentImages.map((_, index) => (
                      <span
                        key={index}
                        className={
                          index === zoomImageIndex ? styles.zoomActiveDot : ""
                        }
                        onClick={() => setZoomImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
