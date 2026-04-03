import React, { useState, useEffect } from "react";
import styles from "./MatBangTang.module.css";
import arrowIcon from "../../assets/images/dropdown-icon.png";

const TOA_CONFIG = {
  A: {
    label: "A",
    floors: [
      { label: "3A", image: "/images/matbang/toa-a/3A.png" },
      { label: "5 - 17", image: "/images/matbang/toa-a/5-17.png" },
      { label: "18", image: "/images/matbang/toa-a/18.png" },
      { label: "19", image: "/images/matbang/toa-a/19.png" },
      { label: "20 - 27", image: "/images/matbang/toa-a/20-27.png" },
    ],
  },
  B1: {
    label: "B1",
    floors: [
      { label: "4", image: "/images/matbang/b1/4.png" },
      { label: "5 - 17", image: "/images/matbang/b1/tang-5-17.png" },
      { label: "18", image: "/images/matbang/b1/18.png" },
      { label: "19", image: "/images/matbang/b1/19.png" },
      { label: "20 - 23", image: "/images/matbang/b1/20-23.png" },
    ],
  },
  B2: {
    label: "B2",
    floors: [
      { label: "4", image: "/images/matbang/b2/4.png" },
      { label: "5 -12", image: "/images/matbang/b2/5-12.png" },
      { label: "13", image: "/images/matbang/b2/13.png" },
      { label: "14", image: "/images/matbang/b2/14.png" },
    ],
  },
};

export default function MatBangTang() {
  const [selectedToa, setSelectedToa] = useState("A");
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const config = TOA_CONFIG[selectedToa];
  const currentFloor = config.floors[selectedFloor];

  useEffect(() => {
    setSelectedFloor(0); // reset khi đổi tòa
  }, [selectedToa]);

  const openZoom = () => setIsZoomOpen(true);
  const closeZoom = () => setIsZoomOpen(false);

  useEffect(() => {
    if (!isZoomOpen) return;
    const handler = (e) => e.key === "Escape" && closeZoom();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isZoomOpen]);

  useEffect(() => {
    document.body.style.overflow = isZoomOpen ? "hidden" : "";
  }, [isZoomOpen]);

  return (
    <div className={styles.container} id="mat-bang-tang">
      <div className={styles.title}>
        <h2 className={styles.gradientTitle}>MẶT BẰNG TẦNG</h2>
        <h3 className={styles.subTitle}>CĂN HỘ ĐIỂN HÌNH</h3>
      </div>

      {/* FILTER */}
      <div className={styles.filterRow}>
        {/* TÒA */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Tòa</label>
          <div className={styles.selectWrap}>
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
            <img src={arrowIcon} className={styles.arrowIcon} />
          </div>
        </div>

        {/* TẦNG */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Tầng</label>
          <div className={styles.selectWrap}>
            <select
              className={styles.fieldSelect}
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(Number(e.target.value))}
            >
              {config.floors.map((floor, index) => (
                <option key={index} value={index}>
                  {floor.label}
                </option>
              ))}
            </select>
            <img src={arrowIcon} className={styles.arrowIcon} />
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className={styles.imageWrap}>
        <img
          key={currentFloor.image}
          src={currentFloor.image}
          alt="Mặt bằng"
          className={styles.slideImage}
          onClick={openZoom}
        />

        <div className={styles.zoomHint} onClick={openZoom}>
          Phóng to
        </div>
      </div>

      {/* ZOOM */}
      {isZoomOpen && (
        <div className={styles.zoomOverlay} onClick={closeZoom}>
          <div
            className={styles.zoomModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.zoomCloseBtn} onClick={closeZoom}>
              ✕
            </button>
            <img src={currentFloor.image} className={styles.zoomImage} />
            <div className={styles.zoomCaption}>
              {config.label} — Tầng {currentFloor.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
