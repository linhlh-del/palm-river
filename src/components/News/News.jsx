import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./News.css";
import arrowLeft from "../../assets/images/arrow-left.png";
import arrowRight from "../../assets/images/arrow-right.png";
import { fetchNewsList, getHref, formatDate } from "../../services/newsService";

function ArrowIcon({ direction = "right" }) {
  const src = direction === "left" ? arrowLeft : arrowRight;

  return <img src={src} alt="" className="pc-news__arrow-img" />;
}

/**
 * items: nếu component cha đã có sẵn danh sách bài viết thì truyền vào,
 * News.jsx sẽ dùng luôn (không fetch lại). Nếu không truyền (dùng mặc định
 * <News /> như ở trang chủ), component tự fetch từ API.
 */
export default function News({
  items,
  heading = "Tin tức & Sự kiện",
  subheading = "Cập nhật những thông báo mới nhất, các cột mốc quan trọng của dự án và những sự kiện độc quyền từ Palm City.",
  moreHref = "/tin-tuc",
}) {
  const [fetchedItems, setFetchedItems] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Chỉ tự fetch khi không có items truyền từ props
  useEffect(() => {
    if (items) return;
    let cancelled = false;
    fetchNewsList()
      .then((data) => {
        if (!cancelled) setFetchedItems(data);
      })
      .catch((err) => {
        console.error("Lỗi tải tin tức:", err);
        if (!cancelled) setFetchError("Không tải được tin tức.");
      });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const displayItems = items ?? fetchedItems;

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 24 : 1;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEdges, displayItems]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstChild;
    const distance = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  // --- Hết phần hook, từ đây mới được return sớm ---

  if (!displayItems && !fetchError) {
    return (
      <section className="pc-news" id="tin-tuc">
        <div className="pc-news__inner">
          <header className="pc-news__header">
            <h2 className="pc-news__heading">{heading}</h2>
          </header>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            Đang tải tin tức...
          </p>
        </div>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="pc-news" id="tin-tuc">
        <div className="pc-news__inner">
          <header className="pc-news__header">
            <h2 className="pc-news__heading">{heading}</h2>
          </header>
          <p style={{ textAlign: "center", marginTop: 24 }}>{fetchError}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pc-news" id="tin-tuc">
      <div className="pc-news__inner">
        <header className="pc-news__header">
          <h2 className="pc-news__heading">{heading}</h2>
          <p className="pc-news__sub">{subheading}</p>
        </header>

        <div className="pc-news__controls">
          <div
            className="pc-news__nav"
            role="group"
            aria-label="Điều hướng tin tức"
          >
            <button
              type="button"
              className="pc-news__navbtn"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Tin trước"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="pc-news__navbtn"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Tin tiếp theo"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>

          <Link className="pc-news__more" to={moreHref}>
            <span>Xem thêm</span>
            <span className="pc-news__more-icon">
              <ArrowIcon direction="right" />
            </span>
          </Link>
        </div>

        <div className="pc-news__track" ref={trackRef}>
          {displayItems.map((item) => {
            const href = getHref(item.id);
            return (
              <article className="pc-card" key={item.id}>
                <Link
                  className="pc-card__media"
                  to={href}
                  aria-label={item.title}
                >
                  <img src={item.image_url} alt={item.title} loading="lazy" />
                  <span className="pc-card__tag">{item.tag}</span>
                </Link>

                <div className="pc-card__body">
                  <h3 className="pc-card__title">
                    <Link to={href}>{item.title}</Link>
                  </h3>
                  <p className="pc-card__excerpt">{item.excerpt}</p>

                  <div className="pc-card__foot">
                    <span className="pc-card__date">
                      {formatDate(item.published_at)}
                    </span>
                    <Link className="pc-card__link" to={href}>
                      Đọc thêm
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="pc-news__dots"
          role="tablist"
          aria-label="Vị trí tin tức"
        >
          {displayItems.map((item, i) => (
            <span
              key={item.id}
              className={
                "pc-news__dot" + (i === activeIndex ? " is-active" : "")
              }
              role="tab"
              aria-selected={i === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
