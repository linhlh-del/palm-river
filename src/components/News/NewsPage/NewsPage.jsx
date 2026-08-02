import React from "react";
import { Link } from "react-router-dom";
import "./NewsPage.css";
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx";
import {
  NEWS_ARTICLES,
  getFeatured,
  getHighlights,
  getHref,
} from "../../../data/news";

export default function NewsPage() {
  const featured = getFeatured();
  const highlights = getHighlights(featured.id, 2);
  // Toàn bộ tin còn lại (không tính tin nổi bật) hiển thị trong lưới "Điểm nổi bật"
  const grid = NEWS_ARTICLES.filter((item) => item.id !== featured.id);

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
                <p>{featured.date}</p>
              </div>
            </div>
            <figure>
              <Link to={getHref(featured.id)}>
                <img src={featured.image} alt={featured.title} loading="lazy" />
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
                  <p>{item.date}</p>
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
                  <img src={item.image} alt={item.title} loading="lazy" />
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
                <p>{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
