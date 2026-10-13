// src/utils/tracker.js
// Tracker analytics cho landing page (module độc lập, không import component).
// - Mọi lỗi của tracker đều bị nuốt: tracker lỗi thì landing vẫn chạy bình thường.
// - Không thu PII: không SĐT/email/tên/nội dung form/giá trị click ID.
// - VITE_TRACK_URL trống => không gửi request nào (chỉ log console khi VITE_TRACK_DEBUG=1).

const ENV = import.meta.env || {};
const TRACK_URL = (ENV.VITE_TRACK_URL || "").trim();
const DEBUG = ENV.VITE_TRACK_DEBUG === "1";
const RESPECT_DNT = ENV.VITE_TRACK_RESPECT_DNT === "1"; // mặc định KHÔNG tôn trọng DNT (cần chốt)
const ATTACH_IDS = ENV.VITE_TRACK_ATTACH_IDS === "1"; // đính kèm visitor/session id vào POST lead

const K_VID = "pr_vid";
const K_SID = "pr_sid";
const K_OFF = "no_track";

const SESSION_TTL = 30 * 60 * 1000;
const TOUCH_THROTTLE = 5000;
const FLUSH_SIZE = 10;
const FLUSH_DELAY = 4000;
const MAX_BATCH = 20;
const MAX_BODY = 7500;
const MAX_QUEUE = 100;

const ALLOWED = new Set([
  "pageview",
  "scroll",
  "section_view",
  "cta_click",
  "form_start",
  "lead",
  "leave",
]);

const BOT_RE = /bot|crawler|spider|headless|lighthouse|pagespeed|gtmetrix/i;

// Section không có id/data-section trong DOM hiện tại -> khai báo bổ sung ở đây
// (để KHÔNG phải sửa JSX/giao diện).
const SECTION_SEL = "section[id], footer[id], [data-section]";
const SECTION_FALLBACKS = [
  [".hero", "hero"],
  ["#tien-ich", "tien-ich"], // TienIch là <div id>, không phải <section>
  [".mbt:not(.mbt__popup-portal)", "mat-bang-tang"],
];
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

let ready = false;
let pendingPath = null;
let queue = [];
let flushTimer = null;
let lastTouch = 0;
let lastLeave = 0;
let lastPv = { path: "", t: 0 };
let lastCta = { label: "", t: 0 };
let memVid = null;

const dbg = (...a) => {
  if (!DEBUG) return;
  try {
    console.log("[tracker]", ...a);
  } catch {
    /* noop */
  }
};

/* ───────────── Storage an toàn (Safari private, chặn storage...) ───────────── */
const mem = {};
function lsGet(k) {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return k in mem ? mem[k] : null;
  }
}
function lsSet(k, v) {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    mem[k] = v;
  }
}
function lsDel(k) {
  try {
    window.localStorage.removeItem(k);
  } catch {
    delete mem[k];
  }
}

/* ───────────── Tiện ích ───────────── */
function uuid() {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* noop */
  }
  try {
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64;
    b[8] = (b[8] & 63) | 128;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  } catch {
    /* noop */
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 3) | 8).toString(16);
  });
}

// Cắt độ dài + bỏ ký tự điều khiển
function clean(v, n) {
  if (v == null) return "";
  const str = String(v);
  let s = "";
  for (let i = 0; i < str.length && s.length < n * 2; i++) {
    const c = str.charCodeAt(i);
    if (c > 31 && c !== 127) s += str[i];
  }
  return s.trim().slice(0, n);
}

// Label không bao giờ được chứa SĐT / email
function safeLabel(v, n = 40) {
  const s = String(v == null ? "" : v)
    .replace(/\s+/g, " ")
    .replace(/\+?\d[\d\s.\-()]{6,}\d/g, "")
    .replace(/\S+@\S+/g, "");
  return clean(s, n);
}

function hostOf(u) {
  try {
    return new URL(u).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function currentPath() {
  return clean(window.location.pathname, 200); // bỏ query + hash
}

/* ───────────── Định danh khách / phiên ───────────── */
function getVid() {
  if (memVid) return memVid;
  let v = lsGet(K_VID);
  if (!v) {
    v = uuid();
    lsSet(K_VID, v);
  }
  memVid = v;
  return v;
}

// Nguồn truy cập: chỉ tính 1 lần ở đầu mỗi phiên
function computeSource() {
  const q = new URLSearchParams(window.location.search);
  const low = (k) => clean(q.get(k), 100).toLowerCase();
  const src = low("utm_source");
  const med = low("utm_medium");
  const cam = low("utm_campaign");
  const hasG = q.has("gclid");
  const hasF = q.has("fbclid");
  const hasT = q.has("ttclid");

  let ref = hostOf(document.referrer);
  if (ref && ref === hostOf(window.location.href)) ref = ""; // điều hướng nội bộ

  const has = (s, ...w) => w.some((x) => s.includes(x));
  const paidMed = ["cpc", "ppc", "paid"];
  const searchEngines = ["google.", "bing.", "coccoc", "yahoo.", "duckduckgo."];

  let channel = "direct";
  if (has(src, "zns")) channel = "zns";
  else if (has(src, "zalo")) channel = "zalo";
  else if (hasG || (src === "google" && paidMed.includes(med)))
    channel = "google_ads";
  else if (hasF || has(src, "facebook", "fb", "meta")) channel = "facebook";
  else if (hasT || has(src, "tiktok")) channel = "tiktok";
  else if (has(src, "youtube")) channel = "youtube";
  else if (["cpc", "ppc", "paid", "display"].includes(med))
    channel = "paid_other";
  else if (cam) channel = "campaign";
  else if (ref && searchEngines.some((s) => ref.includes(s)))
    channel = "organic";
  else if (ref) channel = "referral";

  return {
    channel,
    utm_source: src,
    utm_medium: med,
    utm_campaign: cam,
    referrer: ref, // chỉ hostname
  };
}

function saveSession(s) {
  lsSet(K_SID, JSON.stringify(s));
}

function readSession() {
  const raw = lsGet(K_SID);
  if (!raw) return null;
  try {
    const o = JSON.parse(raw);
    if (o && o.id) {
      o.f = o.f || {};
      o.src = o.src || computeSource();
      return o;
    }
  } catch {
    /* noop */
  }
  return null;
}

function ensureSession() {
  const now = Date.now();
  let s = readSession();
  if (!s || now - (s.last || 0) > SESSION_TTL) {
    // Phiên mới: reset cờ "đã gửi" + tính lại nguồn
    s = { id: uuid(), last: now, src: computeSource(), f: {}, pv: false };
    saveSession(s);
  } else if (now - s.last > TOUCH_THROTTLE) {
    s.last = now;
    saveSession(s);
  }
  return s;
}

// Đánh dấu "đã gửi" theo phiên. Trả true nếu đây là lần đầu.
function once(key) {
  const s = ensureSession();
  if (s.f[key]) return false;
  s.f[key] = 1;
  saveSession(s);
  return true;
}

// Cập nhật `last` khi có tương tác (throttle 5s)
function touch() {
  if (!ready) return;
  const now = Date.now();
  if (now - lastTouch < TOUCH_THROTTLE) return;
  lastTouch = now;
  const s = ensureSession();
  if (!s.pv) track("pageview", { path: currentPath() });
}

/* ───────────── Hàng đợi + gửi ───────────── */
function send(events, retry) {
  if (!TRACK_URL) return;
  const body = JSON.stringify({ v: 1, sent_at: Date.now(), events });
  try {
    // text/plain => không preflight CORS
    if (
      navigator.sendBeacon &&
      navigator.sendBeacon(TRACK_URL, new Blob([body], { type: "text/plain" }))
    )
      return;
  } catch {
    /* noop */
  }
  try {
    fetch(TRACK_URL, {
      method: "POST",
      body,
      keepalive: true,
      mode: "cors",
      headers: { "Content-Type": "text/plain" },
    }).catch(() => {
      // tối đa 1 lần retry
      if (!retry && document.visibilityState !== "hidden") {
        setTimeout(() => send(events, true), 2000);
      }
    });
  } catch {
    /* noop */
  }
}

function flush() {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  try {
    while (queue.length) {
      const batch = [];
      let size = 60;
      while (queue.length && batch.length < MAX_BATCH) {
        const len = JSON.stringify(queue[0]).length + 1;
        if (batch.length && size + len > MAX_BODY) break;
        size += len;
        batch.push(queue.shift());
      }
      send(batch);
    }
  } catch {
    queue = [];
  }
}

function pushEvent(type, s, path, label) {
  const src = s.src || {};
  const e = {
    ts: Date.now(),
    type,
    visitor_id: getVid(),
    session_id: s.id,
    path: clean(path, 200),
    label: label ? clean(label, 60) : null,
    channel: src.channel || "direct",
    utm_source: src.utm_source || null,
    utm_medium: src.utm_medium || null,
    utm_campaign: src.utm_campaign || null,
    referrer: src.referrer || null,
  };
  queue.push(e);
  if (queue.length > MAX_QUEUE) queue.shift();
  dbg(type, e);

  if (type === "lead" || queue.length >= FLUSH_SIZE) {
    flush(); // lead flush ngay, không chờ batch
  } else if (!flushTimer) {
    flushTimer = setTimeout(flush, FLUSH_DELAY);
  }
}

/* ───────────── API chính ───────────── */
export function track(type, opts = {}) {
  if (!ready) return;
  try {
    if (!ALLOWED.has(type)) return;
    const s = ensureSession();
    const path = opts.path || currentPath();
    // Phiên mới (vd quay lại sau >30 phút) luôn có pageview đầu tiên
    if (type !== "pageview" && !s.pv) {
      pushEvent("pageview", s, path, null);
      s.pv = true;
      saveSession(s);
    }
    if (type === "pageview" && !s.pv) {
      s.pv = true;
      saveSession(s);
    }
    pushEvent(type, s, path, opts.label);
  } catch (err) {
    dbg("track error", err);
  }
}

function doPageview(rawPath) {
  const p = clean(String(rawPath || currentPath()).split(/[?#]/)[0], 200);
  const now = Date.now();
  if (p === lastPv.path && now - lastPv.t < 1000) return; // dedupe 1s (StrictMode)
  lastPv = { path: p, t: now };
  track("pageview", { path: p });
  // Trang mới: quét lại section + kiểm tra scroll sau khi nội dung render
  setTimeout(scanSections, 300);
  setTimeout(scanSections, 1500);
  setTimeout(() => checkScroll(true), 2500);
}

export function trackPageview(path) {
  try {
    if (!ready) {
      pendingPath = path; // gọi trước khi tracker init xong -> init sẽ xử lý
      return;
    }
    doPageview(path);
  } catch {
    /* noop */
  }
}

// Dùng cho leadService: đính kèm id vào POST lead (chỉ khi bật VITE_TRACK_ATTACH_IDS=1)
export function getTrackingIds() {
  if (!ATTACH_IDS || !ready) return {};
  try {
    const s = ensureSession();
    return { visitor_id: getVid(), session_id: s.id };
  } catch {
    return {};
  }
}

/* ───────────── Scroll ───────────── */
let scrollTimer = null;
function onScroll() {
  touch();
  if (scrollTimer) return;
  scrollTimer = setTimeout(() => {
    scrollTimer = null;
    checkScroll(false);
  }, 200);
}

function checkScroll(allowShort) {
  if (!ready) return;
  try {
    const doc = document.documentElement;
    const total = Math.max(
      doc.scrollHeight,
      (document.body && document.body.scrollHeight) || 0,
    );
    const view = window.innerHeight;
    let pct;
    if (total - view <= 100) {
      // Trang quá ngắn: coi như 100% (chỉ sau khi nội dung đã ổn định)
      if (!allowShort) return;
      pct = 100;
    } else {
      pct = ((window.scrollY + view) / total) * 100;
    }
    const path = currentPath();
    // Nhảy cóc: bắn TẤT CẢ mốc đã vượt qua
    [25, 50, 75, 100].forEach((m) => {
      if (pct >= m - 0.5 && once(`sc:${path}:${m}`)) {
        track("scroll", { label: String(m) });
      }
    });
  } catch {
    /* noop */
  }
}

/* ───────────── Section view ───────────── */
let io = null;
let mo = null;
let moTimer = null;
const observed = new Map(); // el -> { label, timer, done }

function collectSections() {
  const out = [];
  document.querySelectorAll(SECTION_SEL).forEach((el) => {
    // bỏ section lồng trong section khác (vd #tongquan nằm trong #tong-quan)
    if (el.parentElement && el.parentElement.closest(SECTION_SEL)) return;
    const label = el.getAttribute("data-section") || el.id;
    if (label) out.push([el, clean(label, 60)]);
  });
  SECTION_FALLBACKS.forEach(([sel, label]) => {
    try {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.matches(SECTION_SEL)) return;
        if (el.closest(".building-detail-overlay")) return;
        out.push([el, label]);
      });
    } catch {
      /* selector không hợp lệ ở trình duyệt cũ */
    }
  });
  return out;
}

function ensureIO() {
  if (io || !("IntersectionObserver" in window)) return io;
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rec = observed.get(entry.target);
        if (!rec || rec.done) return;
        // Section cao hơn viewport không bao giờ đạt 40% ratio -> tính theo cả chiều cao hiển thị
        const visible =
          entry.isIntersecting &&
          (entry.intersectionRatio >= 0.4 ||
            entry.intersectionRect.height >= window.innerHeight * 0.4);
        if (visible) {
          if (!rec.timer) {
            rec.timer = setTimeout(() => {
              rec.timer = null;
              rec.done = true;
              if (once(`sv:${rec.label}`)) {
                track("section_view", { label: rec.label });
              }
            }, 1000);
          }
        } else if (rec.timer) {
          clearTimeout(rec.timer);
          rec.timer = null;
        }
      });
    },
    { threshold: THRESHOLDS },
  );
  return io;
}

function scanSections() {
  if (!ready) return;
  try {
    const obs = ensureIO();
    if (!obs) return;
    observed.forEach((rec, el) => {
      if (!el.isConnected) {
        obs.unobserve(el);
        if (rec.timer) clearTimeout(rec.timer);
        observed.delete(el);
      }
    });
    collectSections().forEach(([el, label]) => {
      if (observed.has(el)) return;
      observed.set(el, { label, timer: null, done: false });
      obs.observe(el);
    });
  } catch {
    /* noop */
  }
}

/* ───────────── CTA click ───────────── */
function ctaLabel(el) {
  const d = el.getAttribute("data-cta");
  if (d) return safeLabel(d, 60);
  const href = el.getAttribute("href") || "";
  // tel/zalo luôn ưu tiên: aria-label có thể chứa SĐT
  if (/^tel:/i.test(href)) return "hotline";
  if (/zalo\.me/i.test(href)) return "zalo";
  if (/^mailto:/i.test(href)) return "email";
  const aria = el.getAttribute("aria-label");
  const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
  const label = safeLabel(aria || txt, 40);
  if (label) return label;
  if (href.startsWith("#")) return "anchor";
  if (/^https?:/i.test(href)) return "external";
  return "button";
}

function onClick(ev) {
  try {
    touch();
    const t = ev.target;
    if (!t || !t.closest) return;
    const el = t.closest('a, button, [role="button"], [data-cta]');
    if (!el) return;
    if (el.closest("[data-cta-ignore]")) return;
    // Menu điều hướng thuần -> bỏ qua cho đỡ nhiễu (trừ khi có data-cta)
    if (!el.hasAttribute("data-cta") && el.closest("nav")) return;
    const label = ctaLabel(el);
    if (!label) return;
    const now = Date.now();
    if (label === lastCta.label && now - lastCta.t < 300) return;
    lastCta = { label, t: now };
    track("cta_click", { label });
  } catch {
    /* noop */
  }
}

/* ───────────── Form start ───────────── */
function formLabel(f) {
  const d = f.getAttribute("data-form-type") || f.id;
  if (d) return clean(d, 60);
  let n = f;
  for (let i = 0; n && i < 8; i++) {
    const c = typeof n.className === "string" ? n.className : "";
    if (/modal|popup/i.test(c)) return "popup";
    if (n !== f && n.id && /^(section|footer)$/i.test(n.tagName)) {
      return clean(n.id, 60);
    }
    n = n.parentElement;
  }
  return "form";
}

function onFocusIn(ev) {
  try {
    const f = ev.target && ev.target.closest && ev.target.closest("form");
    if (!f) return;
    const label = formLabel(f); // tuyệt đối không đọc giá trị ô nhập
    if (once(`fs:${label}`)) track("form_start", { label });
  } catch {
    /* noop */
  }
}

/* ───────────── Rời trang / bfcache ───────────── */
function onHidden() {
  try {
    const now = Date.now();
    if (now - lastLeave >= 10000) {
      lastLeave = now;
      track("leave");
    }
    flush();
  } catch {
    /* noop */
  }
}

function onVisibility() {
  if (document.visibilityState === "hidden") onHidden();
}

function onPageShow(e) {
  if (e.persisted) {
    lastPv = { path: "", t: 0 };
    doPageview(currentPath()); // ensureSession tự kiểm tra phiên còn hạn
  }
}

/* ───────────── Khởi tạo ───────────── */
function isDisabled() {
  try {
    const nt = new URLSearchParams(window.location.search).get("no_track");
    if (nt === "1") lsSet(K_OFF, "1");
    else if (nt === "0") lsDel(K_OFF);
  } catch {
    /* noop */
  }
  if (lsGet(K_OFF) === "1") return true;
  if (
    RESPECT_DNT &&
    (navigator.doNotTrack === "1" || window.doNotTrack === "1")
  )
    return true;
  if (navigator.webdriver) return true;
  if (BOT_RE.test(navigator.userAgent || "")) return true;
  if (
    !DEBUG &&
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
  )
    return true;
  return false;
}

function start() {
  ready = true;

  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocusIn);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onHidden);
  window.addEventListener("pageshow", onPageShow);

  try {
    const root = document.getElementById("root") || document.body;
    mo = new MutationObserver(() => {
      if (moTimer) clearTimeout(moTimer);
      moTimer = setTimeout(scanSections, 500);
    });
    mo.observe(root, { childList: true, subtree: true });
  } catch {
    /* noop */
  }

  doPageview(pendingPath || currentPath());
  pendingPath = null;
}

export function initTracker() {
  try {
    if (typeof window === "undefined" || window.__prTracker) return;
    window.__prTracker = 1; // chỉ khởi tạo 1 lần (HMR/StrictMode)
    if (isDisabled()) return; // tắt: không tạo ID, không gửi, không observer

    if (document.visibilityState === "hidden") {
      // tab prerender/nền: chỉ bắt đầu khi thực sự được hiển thị
      const h = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", h);
          try {
            start();
          } catch {
            /* noop */
          }
        }
      };
      document.addEventListener("visibilitychange", h);
    } else {
      start();
    }
  } catch (err) {
    dbg("init error", err);
  }
}
