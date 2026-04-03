import React, { useEffect, useState } from "react";
import styles from "./Chinhsachuudai.module.css";
import arrowIcon from "../../assets/images/arrow-icon.png";

export default function Chinhsachuudai() {
  const images = [
    "/images/CSUD/1.jpg",
    "/images/CSUD/2.jpg",
    "/images/CSUD/3.jpg",
    "/images/CSUD/3.jpg",
    "/images/CSUD/4.jpg",
    "/images/CSUD/5.jpg",
    "/images/CSUD/6.jpg",
  ];

  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  const data = [
    { title: "CĂN 1PN GIÁ TỪ", price: "7,3 tỷ" },
    { title: "CĂN 1PN+ GIÁ TỪ", price: "7,5 tỷ" },
    { title: "CĂN 2PN+ GIÁ TỪ", price: "9,6 tỷ" },
    { title: "CĂN 2PN+ GIÁ TỪ", price: "10,9 tỷ" },
    { title: "CĂN 3PN GIÁ TỪ", price: "13,2 tỷ" },
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
          <img src={images[index]} alt="slide" className={styles.image} />

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
        </div>
      </div>
    </div>
  );
}
