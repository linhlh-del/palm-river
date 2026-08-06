import styles from "./FloatingButtons.module.css";

const PHONE_NUMBER = "0877191940";
const PHONE_DISPLAY = "0877 191 940";
const ZALO_URL = "https://zalo.me/1717736678695240623";
const PRICE_URL = "/bang-gia"; // TODO: đổi thành link Bảng Giá thực tế

import zaloLogo from "../../assets/images/logo-zalo.webp";

/* ── Icon components (Tabler icons, inline SVG để responsive theo nút) ── */
function PhoneIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    </svg>
  );
}

function PdfIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
      <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
      <path d="M17 18h2" />
      <path d="M20 15h-3v6" />
      <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1" />
    </svg>
  );
}

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
          <PhoneIcon className={styles.fb__svg} aria-hidden="true" />
        </span>
        <span className={styles.fb__label}>Tư Vấn</span>
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
          <img src={zaloLogo} alt="Zalo" className={styles.fb__logoImg} />
        </span>
        <span className={styles.fb__label}>Chat Zalo</span>
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
          <PdfIcon className={styles.fb__svg} aria-hidden="true" />
        </span>
        <span className={styles.fb__label}>Bảng Giá</span>
      </button>
    </div>
  );
}
