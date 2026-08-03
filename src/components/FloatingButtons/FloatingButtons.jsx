import styles from "./FloatingButtons.module.css";

const PHONE_NUMBER = "0877191940";
const PHONE_DISPLAY = "0877 191 940";
const ZALO_URL = "https://zalo.me/1717736678695240623";
const PRICE_URL = "/bang-gia"; // TODO: đổi thành link Bảng Giá thực tế

import zaloLogo from "../../assets/images/logo-zalo.webp";
import phoneIcon from "../../assets/images/phone.png";
import fileIcon from "../../assets/images/file.png";

export default function FloatingButtons({ onOpenModal }) {
  return (
    <div className={styles.fb__wrapper}>
      {/* ── Phone ── */}

      <a
        href={`tel:${PHONE_NUMBER}`}
        className={`${styles.fb__btn} ${styles["fb__btn--phone"]}`}
        title={`Gọi ngay ${PHONE_DISPLAY}`}
        aria-label={`Gọi ${PHONE_DISPLAY}`}
      >
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--1"]}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--2"]}`}
          aria-hidden="true"
        />
        <span className={styles.fb__icon}>
          <img src={phoneIcon} alt="Gọi điện" width={28} height={28} />
        </span>
        <span className={styles.fb__tooltip}>{PHONE_DISPLAY}</span>
      </a>

      {/* ── Zalo ── */}

      <a
        href={ZALO_URL}
        target="_blank"
        rel="noreferrer"
        className={`${styles.fb__btn} ${styles["fb__btn--zalo"]}`}
        title="Chat Zalo"
        aria-label="Chat qua Zalo"
      >
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--1"]}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--2"]}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--3"]}`}
          aria-hidden="true"
        />
        <span className={styles.fb__icon}>
          <img src={zaloLogo} alt="Zalo" width={50} height={50} />
        </span>
        <span className={styles.fb__tooltip}>Chat Zalo</span>
      </a>

      {/* ── Bảng Giá ── */}

      <button
        type="button"
        onClick={onOpenModal}
        className={`${styles.fb__btn} ${styles["fb__btn--price"]}`}
        title="Bảng Giá"
        aria-label="Xem Bảng Giá"
      >
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--1"]}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.fb__ring} ${styles["fb__ring--2"]}`}
          aria-hidden="true"
        />
        <span className={styles.fb__icon}>
          <img src={fileIcon} alt="Bảng Giá" width={26} height={26} />
        </span>
        <span className={styles.fb__tooltip}>Bảng Giá</span>
      </button>
    </div>
  );
}
