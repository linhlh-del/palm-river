import React, { useState, useEffect } from "react";
import styles from "./CanHo.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";
import arrowAnimLeft from "../../assets/images/icon-arrow-white.png";
const TABS = [
  {
    id: "1pn",
    label: "1PN",
    layouts: [
      {
        id: "1pn",
        label: "1PN",
        price: "7,3 tỷ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "46.59–55.51m²" },
          { label: "Diện tích sàn thực (NSA)", value: "41.52–49.86m²" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: [
          "/images/canho/1pn/1.png",
          "/images/canho/1pn/2.png",
          "/images/canho/1pn/3.png",
          "/images/canho/1pn/4.png",
        ],
      },
      {
        id: "1pn+",
        label: "1PN+",
        price: "8,1 tỷ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "52.00–60.00m²" },
          { label: "Diện tích sàn thực (NSA)", value: "46.00–54.00m²" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: [
          "/images/canho/1pn+/1.png",
          "/images/canho/1pn+/2.png",
          "/images/canho/1pn+/3.png",
        ],
      },
    ],
  },

  {
    id: "2pn",
    label: "2PN",
    layouts: [
      {
        id: "2pn",
        label: "2PN",
        price: "12,5 tỷ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "72.10–85.40m²" },
          { label: "Diện tích sàn thực (NSA)", value: "65.20–77.50m²" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: Array.from(
          { length: 13 },
          (_, i) => `/images/canho/2pn/${i + 1}.png`,
        ),
      },
      {
        id: "2pn+",
        label: "2PN+",
        price: "14,2 tỷ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "88.00–98.00m²" },
          { label: "Diện tích sàn thực (NSA)", value: "79.00–88.00m²" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: ["/images/canho/2pn+/1.png", "/images/canho/2pn+/2.png"],
      },
    ],
  },

  {
    id: "3pn",
    label: "3PN",
    layouts: [
      {
        id: "3pn",
        label: "3PN",
        price: "18,9 tỷ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "105.0–128.5m²" },
          { label: "Diện tích sàn thực (NSA)", value: "95.2–116.8m²" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: Array.from(
          { length: 11 },
          (_, i) => `/images/canho/3pn/${i + 1}.png`,
        ),
      },
    ],
  },

  {
    id: "4pn",
    label: "4PN",
    layouts: [
      {
        id: "4pn",
        label: "4PN",
        price: "Liên hệ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "Cập nhật sau" },
          { label: "Diện tích sàn thực (NSA)", value: "Cập nhật sau" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: Array.from(
          { length: 12 },
          (_, i) => `/images/canho/4pn/${i + 1}.png`,
        ),
      },
    ],
  },

  {
    id: "duplex",
    label: "Duplex",
    layouts: [
      {
        id: "duplex",
        label: "Duplex",
        price: "Liên hệ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "Cập nhật sau" },
          { label: "Diện tích sàn thực (NSA)", value: "Cập nhật sau" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: Array.from(
          { length: 5 },
          (_, i) => `/images/canho/duplex/${i + 1}.jpg`,
        ),
      },
    ],
  },

  {
    id: "penthouse",
    label: "Penthouse",
    layouts: [
      {
        id: "penthouse",
        label: "Penthouse",
        price: "Liên hệ",
        specs: [
          { label: "Diện tích thông thủy (NFA)", value: "Cập nhật sau" },
          { label: "Diện tích sàn thực (NSA)", value: "Cập nhật sau" },
          { label: "Pháp lý", value: "Sổ hồng riêng" },
          { label: "Sở hữu", value: "Lâu dài" },
          { label: "Bàn giao", value: "Năm 2026" },
          { label: "Nội thất", value: "Hoàn thiện cao cấp" },
        ],
        images: Array.from(
          { length: 5 },
          (_, i) => `/images/canho/penthouse/${i + 1}.jpg`,
        ),
      },
    ],
  },
];

function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

function AptInfo({ tab, activeLayoutId, onLayoutChange }) {
  const activeLayout = tab.layouts.find((l) => l.id === activeLayoutId);

  return (
    <div className={styles.aptInfo}>
      {tab.layouts.length > 1 ? (
        <div className={styles.layoutBtns}>
          {tab.layouts.map((layout) => (
            <button
              key={layout.id}
              className={`${styles.layoutBtn} ${
                activeLayoutId === layout.id ? styles.layoutBtnActive : ""
              }`}
              onClick={() => onLayoutChange(layout.id)}
            >
              {layout.label}
            </button>
          ))}
        </div>
      ) : (
        <h3 className={styles.aptTitle}>{activeLayout.label}</h3>
      )}

      <div className={styles.aptDivider} />

      {/* <div className={styles.priceBox}>
        <p className={styles.priceLabel}>GIÁ BÁN DỰ KIẾN</p>
        <p className={styles.priceValue}>{activeLayout.price}</p>
      </div> */}
      <div className={styles.priceBox}>
        <div className={styles.priceLeft}>
          <p className={styles.priceLabel}>GIÁ BÁN DỰ KIẾN</p>
          <p className={styles.priceValue}>{activeLayout.price}</p>
        </div>
        <button
          className={styles.priceTableBtn}
          onClick={() => onOpenModal?.()}
        >
          <img src={arrowAnimLeft} alt="" className={styles.arrowAnimLeft} />
          <img src={arrowAnimLeft} alt="" className={styles.arrowAnimLeft2} />
          <span className={styles.priceTableText}>Xem bảng giá</span>
          <img src={arrowAnimLeft} alt="" className={styles.arrowAnimRight} />
          <img src={arrowAnimLeft} alt="" className={styles.arrowAnimRight2} />
        </button>
      </div>

      <p className={styles.specTitle}>THÔNG SỐ KỸ THUẬT</p>
      <div className={styles.specGrid}>
        {activeLayout.specs.map((s, i) => (
          <div key={i} className={styles.specCard}>
            <span className={styles.specCardLabel}>{s.label}</span>
            <span className={styles.specCardValue}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CanHo({ onOpenModal }) {
  const [activeTabId, setActiveTabId] = useState("1pn");
  const [activeLayoutId, setActiveLayoutId] = useState("1pn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);

  const activeTab = TABS.find((t) => t.id === activeTabId);
  const activeLayout = activeTab.layouts.find((l) => l.id === activeLayoutId);
  const currentImages = activeLayout.images;

  useEffect(() => {
    currentImages.forEach((src) => preloadImage(src));
  }, [activeLayoutId]);

  useEffect(() => {
    const next = currentImages[(currentIndex + 1) % currentImages.length];
    const prev =
      currentImages[
        (currentIndex - 1 + currentImages.length) % currentImages.length
      ];
    preloadImage(next);
    preloadImage(prev);
  }, [currentIndex, currentImages]);

  const changeSlide = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
    }, 180);
  };

  const handleTabClick = (tabId) => {
    if (tabId === activeTabId) return;
    setFade(false);
    setTimeout(() => {
      setActiveTabId(tabId);
      const firstLayoutId = TABS.find((t) => t.id === tabId).layouts[0].id;
      setActiveLayoutId(firstLayoutId);
      setCurrentIndex(0);
      setFade(true);
    }, 180);
  };

  const handleLayoutClick = (layoutId) => {
    if (layoutId === activeLayoutId) return;
    setFade(false);
    setTimeout(() => {
      setActiveLayoutId(layoutId);
      setCurrentIndex(0);
      setFade(true);
    }, 180);
  };

  const handlePrev = () =>
    changeSlide(
      currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1,
    );

  const handleNext = () =>
    changeSlide(
      currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1,
    );

  const openZoom = () => {
    setIsZoomOpen(true);
    setZoomImageIndex(currentIndex);
  };

  const closeZoom = () => {
    setCurrentIndex(zoomImageIndex);
    setIsZoomOpen(false);
  };

  const handleZoomPrev = () =>
    setZoomImageIndex(
      zoomImageIndex === 0 ? currentImages.length - 1 : zoomImageIndex - 1,
    );

  const handleZoomNext = () =>
    setZoomImageIndex(
      zoomImageIndex === currentImages.length - 1 ? 0 : zoomImageIndex + 1,
    );

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

  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  return (
    <section className={styles.section} id="can-ho">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>MẶT BẰNG CĂN HỘ</h2>
        </div>

        {/* Tabs loại hình */}
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTabId === tab.id ? styles.active : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className={styles.carouselWrapper}>
          <AptInfo
            tab={activeTab}
            activeLayoutId={activeLayoutId}
            onLayoutChange={handleLayoutClick}
          />

          <div className={styles.carouselRight}>
            <div className={styles.imageWrapper}>
              <img
                key={`${activeLayoutId}-${currentIndex}`}
                src={currentImages[currentIndex]}
                alt={`${activeLayout.label} - ảnh ${currentIndex + 1}`}
                className={`${styles.slideImg} ${fade ? styles.fadeIn : styles.fadeOut}`}
                loading="lazy"
                decoding="async"
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

        {/* CTA */}
        <div className={styles.cta}>
          <button onClick={() => onOpenModal?.()}>NHẬN BÁO GIÁ CHI TIẾT</button>
        </div>

        {/* Zoom Modal */}
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
                alt={`${activeLayout.label} - Chi tiết`}
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
