import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchNewsList,
  getHref,
  getBannerSrc,
  getHighlights,
  getRelated,
  formatDate,
} from "../../../services/newsService";
import { SITE_INFO } from "../../../data/saleInfo";
import "./NewsDetailPage.css";
import Header from "../../Header/Header.jsx";
import GetInfor from "../../Getinfor/GetInfor.jsx";

/* ---------------------------------------------------------------------------
 * Icon set
 * ------------------------------------------------------------------------ */
const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M19.6161 17.341L19.9947 14.8503H17.6289V13.2343C17.6289 12.5527 17.9595 11.8882 19.0187 11.8882H20.0961V9.76765C20.0961 9.76765 19.1179 9.59912 18.1846 9.59912C16.2358 9.59912 14.9622 10.7917 14.9622 12.9517V14.8503H12.7969V17.341H14.9633V23.3613C15.8462 23.5019 16.7459 23.5019 17.6289 23.3613V17.341H19.6161Z"
      fill="currentColor"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5.53348 12.9201C4.92482 13.5272 4.10029 13.868 3.24068 13.868C2.38107 13.868 1.55654 13.5272 0.94788 12.9201C0.340874 12.3115 0 11.487 0 10.6273C0 9.76774 0.340874 8.94321 0.94788 8.33455L3.49508 5.78735C4.10374 5.18034 4.92827 4.83947 5.78788 4.83947C6.64749 4.83947 7.47202 5.18034 8.08068 5.78735C8.13124 5.83749 8.1714 5.89712 8.19886 5.96283C8.22632 6.02853 8.24053 6.09901 8.24068 6.17022C8.24083 6.24143 8.22691 6.31196 8.19973 6.37778C8.17255 6.4436 8.13264 6.5034 8.08228 6.55375C8.03193 6.6041 7.97213 6.64402 7.90631 6.6712C7.8405 6.69838 7.76996 6.7123 7.69875 6.71215C7.62754 6.712 7.55706 6.69779 7.49136 6.67033C7.42566 6.64287 7.36602 6.60271 7.31588 6.55215C6.46255 5.69881 5.11321 5.69881 4.25988 6.55215L1.71268 9.09935C0.859347 9.95268 0.859347 11.302 1.71268 12.1553C2.56601 13.0087 3.91535 13.0087 4.76868 12.1553L7.18895 9.73615C7.23805 9.68155 7.29775 9.63752 7.36443 9.60674C7.4311 9.57597 7.50334 9.5591 7.57674 9.55715C7.65015 9.55521 7.72318 9.56823 7.79139 9.59543C7.85959 9.62263 7.92155 9.66343 7.97347 9.71536C8.02539 9.76728 8.0662 9.82924 8.0934 9.89744C8.1206 9.96565 8.13362 10.0387 8.13168 10.1121C8.12973 10.1855 8.11286 10.2577 8.08208 10.3244C8.05131 10.3911 8.00728 10.4508 7.95268 10.4999L5.53348 12.9201ZM10.3729 8.08068C9.76429 8.68769 8.93975 9.02856 8.08015 9.02856C7.22054 9.02856 6.39601 8.68769 5.78735 8.08068C5.68593 7.97926 5.62895 7.84171 5.62895 7.69828C5.62895 7.55485 5.68593 7.4173 5.78735 7.31588C5.88877 7.21446 6.02632 7.15749 6.16975 7.15749C6.31318 7.15749 6.45073 7.21446 6.55215 7.31588C7.40548 8.16921 8.75481 8.16921 9.60815 7.31588L12.1553 4.76868C13.0087 3.91535 13.0087 2.56601 12.1553 1.71268C11.302 0.859347 9.95268 0.859347 9.09935 1.71268L6.67908 4.13188C6.62998 4.18648 6.57027 4.23051 6.5036 4.26128C6.43693 4.29206 6.36469 4.30893 6.29129 4.31088C6.21788 4.31282 6.14485 4.2998 6.07664 4.2726C6.00844 4.2454 5.94648 4.20459 5.89456 4.15267C5.84263 4.10075 5.80183 4.03879 5.77463 3.97059C5.74743 3.90238 5.73441 3.82935 5.73635 3.75594C5.7383 3.68254 5.75517 3.6103 5.78594 3.54363C5.81672 3.47695 5.86075 3.41725 5.91535 3.36815L8.33455 0.94788C8.94321 0.340874 9.76774 0 10.6273 0C11.487 0 12.3115 0.340874 12.9201 0.94788C13.5272 1.55654 13.868 2.38107 13.868 3.24068C13.868 4.10029 13.5272 4.92482 12.9201 5.53348L10.3729 8.08068Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowIcon = ({ flip }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 13"
    fill="none"
    style={{ transform: flip ? "scaleX(-1)" : "none" }}
    aria-hidden="true"
  >
    <path
      d="M13.75 6.14C11.67 6.14 9.84 3.76 8.75.14"
      stroke="currentColor"
      strokeMiterlimit="10"
    />
    <path d="M0 6.14h13" stroke="currentColor" strokeMiterlimit="10" />
    <path
      d="M13.75 6.14c-2.08 0-3.9 2.38-5 6"
      stroke="currentColor"
      strokeMiterlimit="10"
    />
  </svg>
);

const ImageIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M21 16l-5.5-5.5-9 9" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * ArticleImage — <img> thật, fallback sang placeholder có caption nếu ảnh lỗi
 * ------------------------------------------------------------------------ */
function ArticleImage({ src, caption }) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className="ndp__figure">
      <div className="ndp__figure-frame" data-broken={broken}>
        <img
          src={src}
          alt={caption || ""}
          loading="lazy"
          onError={() => setBroken(true)}
        />
        <div className="ndp__figure-fallback">
          <ImageIcon />
          <span style={{ fontSize: 12, opacity: 0.85 }}>{caption}</span>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
 * NewsDetailPage — bố cục theo mẫu single-page (banner + card đè lên banner
 * gồm 3 cột: share / nội dung / sidebar), tra cứu bài viết động theo
 * :articleId trong URL. Data lấy từ backend API (Bước 8).
 *
 * onOpenModal: nhận từ App.jsx để Header (variant="full") có thể mở popup
 * "Nhận báo giá" giống như ở trang chủ.
 * ------------------------------------------------------------------------ */
export default function NewsDetailPage({ onOpenModal }) {
  const { articleId } = useParams();

  // --- state & refs: khai báo TẤT CẢ hook trước mọi return sớm bên dưới,
  // để không vi phạm Rules of Hooks khi thêm trạng thái loading/error ---
  const [articles, setArticles] = useState(null); // null = đang tải
  const [fetchError, setFetchError] = useState(null);
  const trackRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchNewsList()
      .then((data) => {
        if (!cancelled) setArticles(data);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách bài viết:", err);
        if (!cancelled) {
          setFetchError(
            "Không tải được bài viết. Vui lòng kiểm tra kết nối và thử lại.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const article = articles
    ? articles.find((a) => a.id === articleId) || null
    : null;

  // Reset UI (carousel, scroll) khi chuyển sang bài viết khác
  useEffect(() => {
    if (!article) return;
    setSlideIndex(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0 });
    window.scrollTo({ top: 0 });
  }, [article?.id]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard API unavailable — vẫn báo đã copy để không chặn UI */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleFacebookShare = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener",
    );
  }, []);

  // --- Hết phần hook, từ đây trở đi mới được return sớm ---

  // Đang tải
  if (!articles && !fetchError) {
    return (
      <>
        <Header variant="full" onOpenModal={onOpenModal} />
        <div className="ndp">
          <div className="ndp__container" style={{ padding: "80px 24px" }}>
            <p>Đang tải bài viết...</p>
          </div>
        </div>
      </>
    );
  }

  // Lỗi mạng / backend không phản hồi
  if (fetchError) {
    return (
      <>
        <Header variant="full" onOpenModal={onOpenModal} />
        <div className="ndp">
          <div className="ndp__container" style={{ padding: "80px 24px" }}>
            <h1>Có lỗi xảy ra</h1>
            <p>{fetchError}</p>
            <Link to="/tin-tuc">Quay lại trang Tin tức</Link>
          </div>
        </div>
      </>
    );
  }

  // Không tìm thấy bài viết theo id trong URL
  if (!article) {
    return (
      <>
        <Header variant="full" onOpenModal={onOpenModal} />
        <div className="ndp">
          <div className="ndp__container" style={{ padding: "80px 24px" }}>
            <h1>Bài viết không tìm thấy</h1>
            <p>
              Xin lỗi, nội dung chi tiết của bài viết này chưa có hoặc đường dẫn
              không hợp lệ.
            </p>
            <Link to="/tin-tuc">Quay lại trang Tin tức</Link>
          </div>
        </div>
      </>
    );
  }

  const { id, tag: category, title, published_at, excerpt } = article;
  const date = formatDate(published_at);
  const categoryHref = "/tin-tuc";
  const heroImage = { src: getBannerSrc(article), alt: title };

  const content =
    article.content && article.content.length > 0
      ? article.content
      : [{ type: "p", text: excerpt }];

  // Chưa có field "tags" riêng có dữ liệu -> tạm fallback dùng category
  const tags = article.tags && article.tags.length ? article.tags : [category];

  const highlights = getHighlights(articles, id, 2);
  const related = getRelated(articles, id, 2);

  const scrollRelated = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild
      ? track.firstChild.offsetWidth + 24
      : 400;
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
    setSlideIndex((i) => Math.min(Math.max(i + dir, 0), related.length - 1));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <Header variant="full" onOpenModal={onOpenModal} />

      <div className="ndp">
        {/* Banner */}
        <div className="ndp__hero">
          {heroImage?.src && (
            <img src={heroImage.src} alt={heroImage.alt || title} />
          )}
        </div>

        {/* Card nội dung — đè lên banner */}
        <div className="ndp__page">
          <div className="ndp__container">
            <div className="ndp__block">
              <div className="ndp__grid">
                {/* Share */}
                <div className="ndp__share">
                  <button
                    type="button"
                    className="ndp__share-btn"
                    onClick={handleFacebookShare}
                    aria-label="Chia sẻ lên Facebook"
                    title="Chia sẻ lên Facebook"
                  >
                    <FacebookIcon />
                  </button>
                  <button
                    type="button"
                    className="ndp__share-btn"
                    onClick={handleCopyLink}
                    aria-label="Sao chép liên kết"
                    title="Sao chép liên kết"
                  >
                    <LinkIcon />
                  </button>
                  {copied && (
                    <span className="ndp__share-copied">Đã copy link</span>
                  )}
                </div>

                {/* Article */}
                <article className="ndp__article">
                  <div className="ndp__head">
                    <span className="ndp__cate">
                      <Link to={categoryHref}>{category}</Link>
                    </span>
                    <h1 className="ndp__title">{title}</h1>
                    <p className="ndp__date">{date}</p>
                  </div>

                  <div className="ndp__content">
                    {content.map((block, i) => {
                      if (block.type === "h2") {
                        return (
                          <h2 key={block.id || i} id={block.id}>
                            {block.text}
                          </h2>
                        );
                      }
                      if (block.type === "img") {
                        return (
                          <ArticleImage
                            key={i}
                            src={block.src}
                            caption={block.caption}
                          />
                        );
                      }
                      if (block.type === "source") {
                        return (
                          <p className="ndp__source" key={i}>
                            {block.text}
                          </p>
                        );
                      }
                      return <p key={i}>{block.text}</p>;
                    })}
                  </div>

                  <div className="ndp__tags">
                    <span className="ndp__tags-label">Tags:</span>
                    <ul>
                      {tags.map((t) => (
                        <li key={t}>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="ndp__aside">
                  <p className="ndp__sidebar-title">Điểm nổi bật</p>
                  <div className="ndp__highlight-list">
                    {highlights.map((h) => (
                      <Link
                        className="ndp__highlight"
                        key={h.id}
                        to={getHref(h.id)}
                      >
                        <div className="ndp__highlight-title">{h.title}</div>
                        <div className="ndp__highlight-meta">
                          <span className="tag">{h.tag}</span>
                          <span>{formatDate(h.published_at)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* Bài viết liên quan */}
        <section className="ndp__related">
          <div className="ndp__container">
            <div className="ndp__related-head">
              <h3>Bài viết liên quan</h3>
              <p>
                Cập nhật những thông báo mới nhất, các cột mốc dự án và những sự
                kiện độc quyền từ Palm City.
              </p>
            </div>

            <div className="ndp__related-toolbar">
              <div className="ndp__related-arrows">
                <button
                  type="button"
                  className="ndp__arrow-btn"
                  onClick={() => scrollRelated(-1)}
                  disabled={slideIndex === 0}
                  aria-label="Bài viết trước"
                >
                  <ArrowIcon flip />
                </button>
                <button
                  type="button"
                  className="ndp__arrow-btn"
                  onClick={() => scrollRelated(1)}
                  disabled={slideIndex >= related.length - 1}
                  aria-label="Bài viết tiếp theo"
                >
                  <ArrowIcon />
                </button>
              </div>

              <Link className="ndp__related-more" to="/tin-tuc">
                Xem thêm <ArrowIcon />
              </Link>
            </div>

            <div className="ndp__related-track" ref={trackRef}>
              {related.map((item) => (
                <Link
                  className="ndp__news-card"
                  to={getHref(item.id)}
                  key={item.id}
                >
                  <figure>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </figure>
                  <div className="ndp__news-card-body">
                    <h4 className="ndp__news-card-title">{item.title}</h4>
                    <p className="ndp__news-card-excerpt">{item.excerpt}</p>
                    <div className="ndp__news-card-meta">
                      <span className="tag">{item.tag}</span>
                      <span>{formatDate(item.published_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / footer */}
        <footer className="ndp__footer">
          <div className="ndp__container">
            <div className="ndp__footer-grid">
              <div>
                <h4>Đăng ký nhận thông tin</h4>
                <h4>Đăng ký nhận thông tin</h4>
                <GetInfor showTitle={false} embedded formType="footer_news" />

                <div className="ndp__footer-contact">
                  <span>
                    <strong>Địa chỉ: </strong>
                    {SITE_INFO.address}
                  </span>
                  <span>
                    <strong>Điện thoại: </strong>
                    {SITE_INFO.phone}
                  </span>
                  <span>
                    <strong>Email: </strong>
                    {SITE_INFO.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="ndp__footer-bottom">{SITE_INFO.copyright}</div>
          </div>
        </footer>
      </div>
    </>
  );
}
