import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // <-- import đúng
import "swiper/css";
import styles from "./MatBangTang.module.css";

export default function MatBangTang() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.gradientTitle}>Mặt Bằng Tầng</h2>
        <h3 className={styles.subTitle}>CĂN HỘ ĐIỂN HÌNH</h3>
      </div>
      <div className={styles.carousel}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img
              src="/images/matbang/1.jpg"
              alt="slide 1"
              className={styles.slideImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/matbang/2.jpg"
              alt="slide 2"
              className={styles.slideImage}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/matbang/3.jpg"
              alt="slide 3"
              className={styles.slideImage}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
