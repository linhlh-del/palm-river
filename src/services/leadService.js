// src/services/leadService.js

// URL này trỏ tới Cloudflare Worker trung gian, KHÔNG phải URL Google Sheet thật.
// Worker sẽ giữ URL Google Sheet dưới dạng secret, không lộ ra frontend.
// Đặt trong file .env: VITE_LEAD_WEBHOOK_URL=https://lead-webhook-worker.your-subdomain.workers.dev
const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL;

/**
 * Gửi thông tin lead đi qua Worker trung gian.
 * Sau này đổi sang database/backend khác chỉ cần sửa trong Worker,
 * không cần sửa component nào ở đây.
 *
 * @param {Object} data - dữ liệu form, ví dụ { name, phone, email, message, apartmentTypes }
 * @returns {Promise<{ success: boolean, error?: unknown }>}
 */
export async function submitLead(data) {
  // Thêm dấu ' trước phone number để Google Sheet không bị mất số 0 đầu
  const payload = {
    ...data,
    phone: data.phone ? `'${data.phone}` : data.phone,
  };

  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Request failed");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
