import React, { useState, useEffect } from "react";
import styles from "./MatBangTang.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";

const TOA_CONFIG = {
  A: {
    label: "Tòa A",
    floorDisplay: "5 – 17",
    image: "/images/matbang/3.jpg",
  },
  B1: {
    label: "Tòa B1",
    floorDisplay: "5 – 12",
    image: "/images/matbang/1.jpg",
  },
  B2: {
    label: "Tòa B2",
    floorDisplay: "12B – 17",
    image: "/images/matbang/2.jpg",
  },
};

export default function MatBangTang() {
  const [selectedToa, setSelectedToa] = useState("A");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const config = TOA_CONFIG[selectedToa];

  const openZoom = () => setIsZoomOpen(true);
  const closeZoom = () => setIsZoomOpen(false);

  // Đóng zoom khi nhấn Escape
  useEffect(() => {
    if (!isZoomOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isZoomOpen]);

  // Lock scroll khi zoom mở
  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  return (
    <div className={styles.container} id="mat-bang-tang">
      <div className={styles.title}>
        <h2 className={styles.gradientTitle}>MẶT BẰNG TẦNG</h2>
        <h3 className={styles.subTitle}>CĂN HỘ ĐIỂN HÌNH</h3>
      </div>

      {/* Filter row */}
      <div className={styles.filterRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Tòa</label>
          <select
            className={styles.fieldSelect}
            value={selectedToa}
            onChange={(e) => setSelectedToa(e.target.value)}
          >
            {Object.keys(TOA_CONFIG).map((toa) => (
              <option key={toa} value={toa}>
                {TOA_CONFIG[toa].label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Tầng</label>
          <div className={styles.fieldText}>{config.floorDisplay}</div>
        </div>
      </div>

      {/* Ảnh — click để zoom */}
      <div className={styles.imageWrap}>
        <img
          key={selectedToa}
          src={config.image}
          alt={`Mặt bằng ${config.label}`}
          className={styles.slideImage}
          onClick={openZoom}
        />
        <div className={styles.zoomHint} onClick={openZoom}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Phóng to
        </div>
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
              src={config.image}
              alt={`Mặt bằng ${config.label} - Chi tiết`}
              className={styles.zoomImage}
            />
            <div className={styles.zoomCaption}>
              {config.label} — Tầng {config.floorDisplay}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
