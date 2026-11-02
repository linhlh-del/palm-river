# CMS cho palm-river-mkt

Trang quản trị tương ứng: `../palm-river-mkt-cms`. Bản quản trị dùng Supabase chung nhưng `project_id=palm-river-mkt` nên nội dung, lead và analytics tách biệt.

## Build

`npm run build` lấy bản nội dung đã đăng từ RPC `cms_get_published_content`, tạo `cms-schema.json` và `cms-status.json`, tải ảnh CMS về cùng domain, build website, rồi áp SEO/head đã đăng vào HTML. Nếu đã cấu hình Supabase mà truy vấn hoặc tải ảnh lỗi, build dừng để giữ bản website cũ. Khi chưa cấu hình, website dùng nội dung có sẵn trong code.

Biến môi trường Production:

```text
CMS_SUPABASE_URL=https://<project-ref>.supabase.co
CMS_SUPABASE_ANON_KEY=<public-anon-key>
CMS_SITE_URL=https://canho-palmriver.vn
```

Project ID được cố định là `palm-river-mkt` (không phụ thuộc tên thư mục VPS). Vite tự tạo URL collect từ `CMS_SUPABASE_URL`; có thể đặt `VITE_CMS_COLLECT_URL` để ghi đè. Bản build xuất `/cms-schema.json` và `/cms-status.json` với CORS để CMS đọc từ domain khác. Đặt `VITE_LEAD_WEBHOOK_URL` như trước hoặc sửa endpoint trong CMS; bản đã đăng sẽ được ưu tiên.

### Tự build trên VPS sau khi đăng CMS

Website được phục vụ trực tiếp từ `dist/` trong thư mục source. Đặt các biến production trên trong `.env` hoặc `.env.production` cạnh `package.json` (không commit file này). Build scripts đọc env file; `npm run build` lấy nội dung đã đăng từ Supabase rồi build `dist/`, nơi web server đang phục vụ. Cài webhook service trên VPS theo [`cms-supabase/vps-deploy-hook/README.md`](../cms-supabase/vps-deploy-hook/README.md), rồi cấu hình `DEPLOY_HOOK_PALM_RIVER_MKT` và token tương ứng trong Supabase.

## Trường đang quản lý

Hero, tổng quan, vị trí, mặt bằng tổng thể, tiện ích, thư viện, tiêu đề tin tức, form đăng ký; ảnh hero/tổng quan/mặt bằng tổng thể/sơ đồ tiện ích; thứ tự và ẩn/hiện section; hotline/Zalo; SEO trang chủ và trang tin tức; thẻ head/tracking; endpoint form. Bài viết tin tức vẫn lấy từ API Palm River hiện tại. Các hình học zone, toạ độ căn hộ và bảng dữ liệu kỹ thuật vẫn nằm trong code để tránh làm sai sơ đồ khi sửa nội dung.

## Lead

Form hiện gửi tới Worker `lead-webhook-worker`. Để mục Lead của CMS nhận cùng dữ liệu, Worker cần ghi bản sao vào bảng `public.cms_leads` trong cùng Supabase project, với `project_id=palm-river-mkt`. Cần giữ secret service role ở Worker, không đặt ở frontend. Dashboard bắt đầu có sự kiện khi `VITE_CMS_COLLECT_URL` được cấu hình.

## Giới hạn hiện tại

Landing page vẫn là SPA. Build tạo HTML riêng cho `/tin-tuc` để SEO trang đó hoạt động; các URL chi tiết tin tức `/tin-tuc/:id` chưa được prerender riêng và tiếp tục dùng meta của trang chủ khi bot không chạy JavaScript.
