import { useState } from "react";
import "./MatBangTang.css";
import { FILTERS, GALLERY_ITEMS } from "./data";

export default function MatBangTang({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState(FILTERS[0]?.key ?? "");

  const handleOpenModal = () => {
    if (typeof onOpenModal === "function") {
      onOpenModal();
    }
  };

  const gallery = GALLERY_ITEMS.filter(
    (item) => item.category === activeCategory,
  );

  // Hiện tại luôn dùng 1 ảnh duy nhất cho mỗi loại mặt bằng
  const currentItem = gallery[0] ?? null;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section id="matbangtang" className="mbt-section">
      <div className="mbt-container">
        <div className="mbt-content">
          {/* CỘT TRÁI (desktop) / HÀNG TRÊN (mobile): text */}
          <div className="mbt-text-col">
            <h2 className="mbt-section-title">
              MẶT BẰNG TẦNG <br />
              ĐIỂN HÌNH
            </h2>

            <p className="mbt-description">
              Các căn hộ được quy hoạch tối ưu hóa công năng, đón trọn ánh sáng
              tự nhiên và luồng gió mát từ dòng sông.
            </p>

            {FILTERS.length > 1 && (
              <div className="mbt-filters">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`mbt-filter-btn ${
                      activeCategory === filter.key ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CỘT PHẢI (desktop) / HÀNG DƯỚI (mobile): ảnh */}
          <div className="mbt-image-col">
            <div className="mbt-gallery-single">
              <div className="mbt-gallery-item show">
                {currentItem ? (
                  <img
                    src={currentItem.src}
                    alt={currentItem.alt}
                    loading="lazy"
                    onClick={handleOpenModal}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Ghi chú full-width phía dưới */}
        <div className="mbt-notes">
          <p className="mbt-note-item">
            <span className="mbt-note-icon" />
            100% căn hộ đều có ban công và logia riêng - tiêu chí bắt buộc của
            dự án hạng sang.
          </p>
          <p className="mbt-note-item">
            <span className="mbt-note-icon" />
            Gần như tất cả 6 căn đều là căn góc - tối đa ánh sáng, thông gió và
            tầm nhìn cho mỗi căn hộ.
          </p>
        </div>
      </div>
    </section>
  );
}
