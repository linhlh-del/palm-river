import { useState, useEffect, useRef } from "react";
import bannerVideo from "../../assets/video/palm-city.mp4";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Intersection Observer để kiểm tra xem hero có đang hiển thị không
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Play/pause video based on visibility
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay có thể bị chặn bởi browser
          });
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }, // Khi 10% của section hiển thị
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      {/* Video Banner */}
      <video
        ref={videoRef}
        className="hero__video"
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={bannerVideo} type="video/mp4" />
        {/* Fallback hình ảnh nếu browser không support video */}
        {/* <img src={heroBg} alt="Lusso Saigon Hero" className="hero__fallback" /> */}
      </video>
    </div>
  );
}
