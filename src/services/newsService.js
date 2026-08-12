// src/services/newsService.js
// Thay thế phần data-access của data/news.js (NEWS_ARTICLES tĩnh) bằng gọi API
// tới backend palm-river-backend. Giữ lại các helper thuần (getHref, format...)
// vì không phụ thuộc data nên không cần fetch.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Lấy toàn bộ danh sách bài viết từ backend.
 * Dùng chung cho NewsPage (danh sách) và NewsDetailPage (tìm theo id, tính
 * highlights/related) — giống cách NEWS_ARTICLES tĩnh được dùng trước đây.
 * @returns {Promise<Array>}
 */
export async function fetchNewsList() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL chưa được cấu hình trong .env");
  }
  const res = await fetch(`${API_BASE_URL}/api/news`);
  if (!res.ok) {
    throw new Error(`Không tải được danh sách bài viết (status ${res.status})`);
  }
  return res.json();
}

/** Đường dẫn nội bộ tới trang chi tiết 1 bài viết. */
export function getHref(id) {
  return `/tin-tuc/${id}`;
}

/**
 * Ảnh banner của bài viết. Trước đây fallback qua BANNERS[id] (import.meta.glob),
 * giờ backend đã trả sẵn banner_url — nếu null thì fallback về image_url,
 * giữ đúng hành vi cũ (bài chưa có banner riêng thì dùng ảnh thumbnail).
 */
export function getBannerSrc(article) {
  return article?.banner_url || article?.image_url || null;
}

/** Danh sách "Điểm nổi bật" — loại trừ bài đang xem. */
export function getHighlights(articles, excludeId, count = 2) {
  return articles.filter((a) => a.id !== excludeId).slice(0, count);
}

/** Danh sách "Bài viết liên quan" — loại trừ bài đang xem. */
export function getRelated(articles, excludeId, count = 2) {
  return articles.filter((a) => a.id !== excludeId).slice(0, count);
}

/** Bài mới nhất, dùng làm "Tin mới nhất" ở NewsPage. */
export function getFeatured(articles) {
  return articles[0] ?? null;
}

/**
 * published_at trả về từ DB dạng ISO "2026-07-08" -> hiển thị "08/07/2026"
 * để giữ đúng format hiển thị cũ (trước đây field "date" trong news.js đã
 * là string dd/mm/yyyy, giờ DB lưu date chuẩn ISO nên cần format lại).
 */
export function formatDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}/${m}/${y}`;
}
