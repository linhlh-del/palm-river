import { useEffect, useState } from "react";
import "./Layout.css";
import { LAYOUT_FILTERS, LAYOUT_ITEMS } from "./data";

const GROUP_SWITCH_MS = 380; // phải khớp với transition duration trong CSS (.lo-plan-wrap)

const groupOf = (key) =>
  LAYOUT_ITEMS.find((item) => item.key === key)?.group ?? null;

export default function Layout({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState(
    LAYOUT_FILTERS[0]?.key ?? "",
  );

  // renderCategory = cặp ảnh ĐANG thực sự hiển thị trong cột phải.
  // Khác activeCategory trong lúc đang chạy animation "out" khi đổi nhóm,
  // nhờ vậy ảnh cũ có thời gian fade/scale ra hết rồi mới đổi src.
  const [renderCategory, setRenderCategory] = useState(activeCategory);
  // 'visible' -> đang hiện bình thường
  // 'hiding'  -> đang fade/scale nhỏ để chuẩn bị đổi nhóm
  // 'hidden'  -> đã đổi src xong, đang ở trạng thái ẩn KHÔNG transition,
  //              chờ 1 frame để bật transition trở lại -> tạo hiệu ứng bay vào
  const [phase, setPhase] = useState("visible");

  const renderGroup = groupOf(renderCategory);
  // Cặp ảnh cùng nhóm đang hiển thị (vd: 2pn + 2pn-goc)
  const groupItems = LAYOUT_ITEMS.filter((item) => item.group === renderGroup);

  // Bước 1: activeCategory đổi sang nhóm khác -> bắt đầu ẩn cặp ảnh cũ
  useEffect(() => {
    if (groupOf(activeCategory) === renderGroup) {
      // Cùng nhóm (vd 2pn <-> 2pn-goc): chỉ cần đổi active/inactive,
      // không cần fade cả cụm, nên cập nhật renderCategory ngay lập tức.
      setRenderCategory(activeCategory);
      return;
    }
    setPhase("hiding");
  }, [activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  // Bước 2: hết thời gian "hiding" -> đổi ảnh, đặt về trạng thái ẩn không transition
  useEffect(() => {
    if (phase !== "hiding") return undefined;
    const t = setTimeout(() => {
      setRenderCategory(activeCategory);
      setPhase("hidden");
    }, GROUP_SWITCH_MS);
    return () => clearTimeout(t);
  }, [phase, activeCategory]);

  // Bước 3: đợi đúng 1 frame rồi bật lại transition -> ảnh mới "bay" vào mượt
  useEffect(() => {
    if (phase !== "hidden") return undefined;
    const raf = requestAnimationFrame(() => setPhase("visible"));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleOpenModal = (src, alt) => {
    if (typeof onOpenModal === "function" && src) {
      onOpenModal({ src, alt });
    }
  };

  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section id="layout" className="lo-section">
      <div className="lo-container">
        <div className="lo-content">
          {/* CỘT TRÁI (desktop) / HÀNG TRÊN (mobile): text + filter */}
          <div className="lo-text-col">
            <h2 className="lo-section-title">
              MẶT BẰNG <br />
              CĂN HỘ
            </h2>

            <p className="lo-description">
              4 loại mặt bằng được nghiên cứu kỹ lưỡng, tối ưu công năng sử dụng
              và tối đa hoá tầm nhìn cho từng loại căn hộ.
            </p>

            {LAYOUT_FILTERS.length > 1 && (
              <div className="lo-filters">
                {LAYOUT_FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`lo-filter-btn ${
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

          {/* CỘT PHẢI (desktop) / HÀNG DƯỚI (mobile): cặp ảnh cùng nhóm */}
          <div className="lo-image-col">
            <div
              className={`lo-plan-wrap ${
                phase === "visible" ? "is-visible" : "is-hidden"
              }`}
              // Khi phase === 'hidden' tắt hẳn transition trong 1 frame để
              // ảnh "nhảy" thẳng về vị trí ẩn, rồi bước 3 mới bật lại
              // transition -> animation bay vào luôn bắt đầu từ đúng điểm xuất phát.
              style={
                phase === "hidden" ? { transitionDuration: "0s" } : undefined
              }
            >
              {groupItems.map((item) => {
                const isActive = item.key === renderCategory;
                return (
                  <div
                    key={item.key}
                    className={`lo-plan-frame ${
                      isActive ? "is-active" : "is-inactive"
                    }`}
                  >
                    {isActive && (
                      <>
                        <span className="lo-corner lo-corner-tl" />
                        <span className="lo-corner lo-corner-tr" />
                        <span className="lo-corner lo-corner-bl" />
                        <span className="lo-corner lo-corner-br" />
                      </>
                    )}
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      onClick={() =>
                        // Ảnh đang active -> bấm để xem full (modal)
                        // Ảnh đang mờ/nhỏ -> bấm để zoom nó lên active
                        isActive
                          ? handleOpenModal(item.src, item.alt)
                          : handleCategoryChange(item.key)
                      }
                    />
                    <span className="lo-plan-label">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
