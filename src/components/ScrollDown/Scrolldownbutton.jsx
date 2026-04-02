import { useEffect, useState, useCallback } from "react";
import styles from "./ScrollDownButton.module.css";
import arrowImg from "../../assets/images/arrow-icon.png"; // đổi path / tên file nếu cần

export default function ScrollDownButton({
  visibleUntil = 1.5,
  scrollTarget = null,
}) {
  const [visible, setVisible] = useState(true);

  /* ── Theo dõi scroll ── */
  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight * visibleUntil;
    setVisible(window.scrollY < threshold);
  }, [visibleUntil]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Click: cuộn tới target hoặc +1 viewport ── */
  const handleClick = () => {
    if (scrollTarget) {
      const el =
        typeof scrollTarget === "string"
          ? document.querySelector(scrollTarget)
          : scrollTarget;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div
      className={`${styles.wrapper} ${!visible ? styles.wrapperHidden : ""}`}
      aria-hidden={!visible}
    >
      <button
        className={styles.btn}
        onClick={handleClick}
        aria-label="Cuộn xuống"
      >
        <div className={styles.imgStack}>
          {/* Ảnh mờ phía sau – tạo hiệu ứng trailing depth */}
          <img
            src={arrowImg}
            alt=""
            className={styles.imgBack}
            draggable={false}
          />
          {/* Ảnh chính phía trước */}
          <img
            src={arrowImg}
            alt="Cuộn xuống"
            className={styles.imgFront}
            draggable={false}
          />
        </div>
      </button>
    </div>
  );
}
