import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewsPage.css";
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx";
import {
  fetchNewsList,
  getFeatured,
  getHighlights,
  getHref,
  formatDate,
} from "../../../services/newsService";

export default function NewsPage() {
  const [articles, setArticles] = useState(null); // null = đang tải
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchNewsList()
      .then((data) => {
        if (!cancelled) setArticles(data);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách tin tức:", err);
        if (!cancelled) {
          setFetchError(
            "Không tải được danh sách tin tức. Vui lòng kiểm tra kết nối và thử lại.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Đang tải
  if (!articles && !fetchError) {
    return (
      <div className="pn-page">
        <Header />
        <div className="pn-container" style={{ padding: "80px 0" }}>
          <p>Đang tải tin tức...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Lỗi mạng / backend không phản hồi
  if (fetchError) {
    return (
      <div className="pn-page">
        <Header />
        <div className="pn-container" style={{ padding: "80px 0" }}>
          <p>{fetchError}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Chưa có bài viết nào trong DB
  if (articles.length === 0) {
    return (
      <div className="pn-page">
        <Header />
        <div className="pn-container" style={{ padding: "80px 0" }}>
          <p>Chưa có bài viết nào.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const featured = getFeatured(articles);
  const highlights = getHighlights(articles, featured.id, 2);
  // Toàn bộ tin còn lại (không tính tin nổi bật) hiển thị trong lưới "Điểm nổi bật"
  const grid = articles.filter((item) => item.id !== featured.id);

  return (
    <div className="pn-page">
      <Header />

      {/* Hero */}
      <section className="pn-hero">
        <div className="pn-container">
          <h1 className="pn-hero-title">Tin tức &amp; sự kiện</h1>
          <p className="pn-hero-desc">
            Cập nhật những thông báo mới nhất, các cột mốc quan trọng của dự án
            và những sự kiện độc quyền từ Palm City.
          </p>
        </div>
      </section>

      {/* Featured + highlights */}
      <section className="pn-container">
        <span className="pn-latest-tag">Tin mới nhất</span>
        <div className="pn-main-row">
          <div className="pn-main-news">
            <div className="pn-main-news-detail">
              <h2>
                <Link to={getHref(featured.id)}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="pn-meta-row">
                <p className="pn-tag">
                  <span className="pn-hash">#</span>
                  {featured.tag}
                </p>
                <p>{formatDate(featured.published_at)}</p>
              </div>
            </div>
            <figure>
              <Link to={getHref(featured.id)}>
                <img
                  src={featured.image_url}
                  alt={featured.title}
                  loading="lazy"
                />
              </Link>
            </figure>
          </div>

          <div className="pn-highlight-list">
            {highlights.map((item) => (
              <div className="pn-highlight-item" key={item.id}>
                <Link className="pn-highlight-title" to={getHref(item.id)}>
                  {item.title}
                </Link>
                <div className="pn-meta-row">
                  <p className="pn-tag">
                    <span className="pn-hash">#</span>
                    {item.tag}
                  </p>
                  <p>{formatDate(item.published_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of news */}
      <section className="pn-container pn-grid-section">
        <p className="pn-grid-label">Điểm nổi bật</p>
        <div className="pn-news-grid">
          {grid.map((item) => (
            <article className="pn-news-item" key={item.id}>
              <figure>
                <Link to={getHref(item.id)}>
                  <img src={item.image_url} alt={item.title} loading="lazy" />
                </Link>
              </figure>
              <div className="pn-title-news">
                <Link to={getHref(item.id)}>{item.title}</Link>
              </div>
              {item.excerpt && (
                <div className="pn-descript-news">{item.excerpt}</div>
              )}
              <div className="pn-meta-row">
                <p className="pn-tag">
                  <span className="pn-hash">#</span>
                  {item.tag}
                </p>
                <p>{formatDate(item.published_at)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
