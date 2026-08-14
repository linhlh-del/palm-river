// Chụp UTM + full source URL theo mô hình first-touch attribution:
// - Lần đầu user vào site (có hoặc không có UTM) -> lưu lại
// - Nếu có UTM mới trên URL (VD user click từ 1 campaign khác) -> ghi đè
// - Nếu user đi qua các trang nội bộ không có UTM -> giữ nguyên dữ liệu gốc
const UTM_KEYS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
];
const STORAGE_KEY = "lead_tracking_data";

function readStoredTracking() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredTracking(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage có thể bị chặn (Safari private mode, cookie blocker...) - bỏ qua, không chặn luồng chính
  }
}

/**
 * Gọi 1 LẦN duy nhất khi app khởi động (main.jsx hoặc App.jsx),
 * càng sớm càng tốt, trước khi user tương tác với bất kỳ form nào.
 */
export function captureTrackingData() {
  const params = new URLSearchParams(window.location.search);
  const hasNewUtm = UTM_KEYS.some((key) => params.get(key));
  const existing = readStoredTracking();

  if (hasNewUtm || !existing) {
    const utmData = {};
    UTM_KEYS.forEach((key) => {
      utmData[key] = params.get(key) || "";
    });

    writeStoredTracking({
      sourceUrl: window.location.href,
      capturedAt: new Date().toISOString(),
      ...utmData,
    });
  }
}

/**
 * Lấy dữ liệu tracking đã lưu để đính kèm vào lead khi submit form.
 * Có fallback phòng trường hợp captureTrackingData() chưa được gọi.
 */
export function getTrackingData() {
  const stored = readStoredTracking();
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const utmData = {};
  UTM_KEYS.forEach((key) => {
    utmData[key] = params.get(key) || "";
  });

  return {
    sourceUrl: window.location.href,
    capturedAt: new Date().toISOString(),
    ...utmData,
  };
}
