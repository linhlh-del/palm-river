// src/services/leadService.js
// Gửi lead (form liên hệ) tới backend palm-river-backend, backend sẽ insert
// vào bảng `leads` trên Supabase bằng service_role (bypass RLS).

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Gửi thông tin lead từ form (PopUp, GetInfor, CSBH...) lên backend.
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} leadData.phone
 * @param {string} [leadData.email]
 * @param {string} [leadData.message]
 * @param {string} [leadData.apartmentTypes]
 * @param {string} [leadData.source] - nguồn form (vd: "popup", "csbh"...)
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitLead(leadData) {
  if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL chưa được cấu hình trong .env");
    return {
      success: false,
      error: "Cấu hình hệ thống chưa đầy đủ. Vui lòng thử lại sau.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email ?? null,
        message: leadData.message ?? null,
        apartment_types: leadData.apartmentTypes ?? null,
        source: leadData.source ?? null,
      }),
    });

    if (!response.ok) {
      // Backend trả lỗi có cấu trúc (vd: thiếu field bắt buộc) -> đọc message nếu có
      let errorMessage = "Gửi thông tin thất bại. Vui lòng thử lại.";
      try {
        const data = await response.json();
        if (data?.error) errorMessage = data.error;
      } catch {
        // response không phải JSON, giữ nguyên message mặc định
      }
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (err) {
    // Lỗi mạng (backend chưa chạy, mất kết nối...)
    console.error("submitLead network error:", err);
    return {
      success: false,
      error:
        "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.",
    };
  }
}
