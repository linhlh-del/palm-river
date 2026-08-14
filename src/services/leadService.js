// src/services/leadService.js
// Gửi lead (form liên hệ) tới Cloudflare Worker (lead-webhook-worker),
// Worker sẽ forward dữ liệu sang Google Sheet (Apps Script webhook) đứng phía sau.

const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL;
import { getTrackingData } from "../utils/leadTracking";

/**
 * Gửi thông tin lead từ form (PopUp, GetInfor, CSBH...) lên Cloudflare Worker.
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} leadData.phone
 * @param {string} [leadData.email]
 * @param {string} [leadData.message]
 * @param {string} [leadData.apartmentTypes]
 * @param {string} [leadData.source] - nguồn form (vd: "popup", "csbh"...) - giữ để tương thích ngược
 * @param {string} [leadData.formType] - "popup" | "getinfor" | "csbh"... để phân biệt form nào đổ lead về
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitLead(leadData) {
  if (!LEAD_WEBHOOK_URL) {
    console.error("VITE_LEAD_WEBHOOK_URL chưa được cấu hình trong .env");
    return {
      success: false,
      error: "Cấu hình hệ thống chưa đầy đủ. Vui lòng thử lại sau.",
    };
  }

  const tracking = getTrackingData();

  try {
    const response = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 3 trường trên form
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email ?? null,

        message: leadData.message ?? null,
        apartment_types: leadData.apartmentTypes ?? null,

        // Giữ field cũ để không phá vỡ những nơi đang truyền "source" trực tiếp
        source: leadData.source ?? null,

        // Phân biệt lead đến từ form nào (Popup / GetInfor / CSBH...)
        form_type: leadData.formType ?? null,

        // Thời điểm submit (client-side)
        submitted_at: new Date().toISOString(),

        // Full URL user đang đứng khi vào site lần đầu (first-touch) - dùng để tracking nguồn
        source_url: tracking.sourceUrl,

        // 5 UTM
        utm_source: tracking.utm_source || null,
        utm_campaign: tracking.utm_campaign || null,
        utm_medium: tracking.utm_medium || null,
        utm_content: tracking.utm_content || null,
        utm_term: tracking.utm_term || null,
      }),
    });

    if (!response.ok) {
      // Worker trả lỗi có cấu trúc (vd: thiếu name/phone) -> đọc message nếu có
      let errorMessage = "Gửi thông tin thất bại. Vui lòng thử lại.";
      try {
        const data = await response.json();
        console.error("Webhook lỗi:", data);
        if (data?.error) errorMessage = data.error;
      } catch {
        // response không phải JSON, giữ nguyên message mặc định
      }
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (err) {
    // Lỗi mạng (Worker down, mất kết nối...)
    console.error("submitLead network error:", err);
    return {
      success: false,
      error:
        "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.",
    };
  }
}
