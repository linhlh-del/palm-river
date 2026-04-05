import styles from "./FloatingButtons.module.css";

const PHONE_NUMBER = "0939 535 111";
const PHONE_DISPLAY = "0939 535 111";
const ZALO_URL = "https://zalo.me/0868546821";

import zaloLogo from "../../assets/images/logo-zalo.webp";

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.22 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const ZaloFallback = () => (
  <svg width="50" height="50" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#0068FF" />
    <text
      x="50%"
      y="54%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Arial Black,Arial"
      fontWeight="900"
      fontSize="18"
      fill="white"
    >
      Za
    </text>
  </svg>
);

export default function FloatingButtons() {
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
          <PhoneIcon />
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
          {/* Khi có asset:  */}
        </span>
        <span className={styles.fb__tooltip}>Chat Zalo</span>
      </a>
    </div>
  );
}
