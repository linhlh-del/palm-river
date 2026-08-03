import { useState } from "react";
import "./HinhAnh.css";
import { FILTERS, GALLERY_ITEMS } from "./data";
import arrowLeft from "../../assets/images/arrow-left.png";
import arrowRight from "../../assets/images/arrow-right.png";

export default function HinhAnh({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState("canhquan");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenModal = () => {
    if (typeof onOpenModal === "function") {
      onOpenModal();
    }
  };

  const gallery = GALLERY_ITEMS.filter(
    (item) => item.category === activeCategory,
  );

  const currentItem = gallery[activeImageIndex] ?? null;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveImageIndex(0);
  };

  const goToPrev = () => {
    if (gallery.length === 0) return;
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (gallery.length === 0) return;
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="hinhanh" className="tinb-section tinb-bg-light">
      <div className="tinb-container">
        <h2 className="tinb-section-title">TIỆN ÍCH NỔI BẬT</h2>
        <p className="tinb-description">
          Palm River được phát triển theo mô hình "đô thị nghỉ dưỡng giữa lòng
          thành phố", tích hợp với các phân khu nhà ở cao tầng và thấp tầng,
          thương mại – dịch vụ, trường học quốc tế, bệnh viện quốc tế cùng hệ
          thống tiện ích cộng đồng. Dự án hướng đến việc hình thành môi trường
          sống đồng bộ, đáp ứng nhu cầu ở, học tập, làm việc và sử dụng dịch vụ
          trong cùng khu đô thị.
        </p>
        <div className="tinb-filters">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`tinb-filter-btn ${
                activeCategory === filter.key ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* MOBILE: carousel */}
        <div className="tinb-gallery-carousel tinb-carousel-view">
          {/* Ảnh + nút mũi tên giờ nằm chung 1 khối, mũi tên đè lên trên ảnh */}
          <div className="tinb-carousel-main">
            <div className="tinb-gallery-item show">
              {currentItem ? (
                <>
                  <img
                    src={currentItem.src}
                    alt={currentItem.alt}
                    loading="lazy"
                  />

                  <div className="tinb-gallery-overlay">
                    <span>{currentItem.label}</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="tinb-carousel-controls">
            <button
              type="button"
              className="tinb-carousel-btn tinb-btn-prev"
              onClick={goToPrev}
              aria-label="Ảnh trước"
            >
              <img src={arrowLeft} alt="Ảnh trước" />
            </button>

            <button
              type="button"
              className="tinb-carousel-btn tinb-btn-next"
              onClick={goToNext}
              aria-label="Ảnh tiếp theo"
            >
              <img src={arrowRight} alt="Ảnh tiếp theo" />
            </button>
          </div>
        </div>

        {/* TABLET / DESKTOP: grid */}
        <div className="tinb-gallery-grid tinb-grid-view">
          {gallery.map((item, index) => (
            <div className="tinb-grid-item" key={`${item.category}-${index}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="tinb-grid-overlay">
                {/* <span>{item.label}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
