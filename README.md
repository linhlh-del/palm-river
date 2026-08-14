# Palm River Marketing Website

## 1. Cây thư mục

```text
palm-river-mkt/
├─ public/
│  ├─ icons.svg
│  ├─ images/
│  ├─ logo-masterise.png
│  └─ logo-oneplus.png
├─ src/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ assets/
│  │  └─ images/
│  ├─ components/
│  │  ├─ CanHo/
│  │  ├─ ChinhSachUuDai/
│  │  ├─ CSBH/
│  │  ├─ FloatingButtons/
│  │  ├─ Footer/
│  │  ├─ Getinfor/
│  │  ├─ Header/
│  │  ├─ Hero/
│  │  ├─ HinhAnh/
│  │  ├─ Layout/
│  │  ├─ MapPrime/
│  │  ├─ MatBang/
│  │  ├─ News/
│  │  ├─ PopUp/
│  │  ├─ Position/
│  │  ├─ PositionMap/
│  │  ├─ ScrollDown/
│  │  ├─ ThankYou/
│  │  ├─ TongQuan/
│  │  └─ TongThe/
│  ├─ data/
│  │  ├─ news.js
│  │  └─ saleInfo.js
│  ├─ services/
│  │  ├─ leadService.js
│  │  └─ newsService.js
│  ├─ styles/
│  └─ utils/
│     └─ leadTracking.js
├─ .env
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
├─ vite.config.js
└─ dist/
```

## 2. Tổng quan hệ thống

Đây là website landing page / marketing page cho dự án Palm River, xây dựng bằng React + Vite. Mục tiêu của dự án là:

- giới thiệu dự án và các phân khu
- thu hút khách hàng quan tâm
- chuyển đổi visitors thành lead thông qua form liên hệ
- hiển thị tin tức và bài viết theo phong cách landing page

## 3. Các tính năng chính

### 3.1. Giao diện landing page đa section

Trang chủ bao gồm các phần chính như:

- Header / navigation
- Hero banner
- Tổng quan dự án
- Vị trí dự án
- Tổng thể dự án
- Mặt bằng / sơ đồ tầng
- Layout / không gian dự án
- Tiện ích
- Hình ảnh dự án
- Tin tức
- Form nhận thông tin
- Footer

### 3.2. Smooth scroll theo section

Hệ thống hỗ trợ cuộn tới một section cụ thể theo query string `?section=...` và tự động xóa param sau khi đã scroll xong. Điều này giúp điều hướng từ link ngoài vào đúng vị trí cần xem.

### 3.3. Popup liên hệ và nút floating CTA

- Popup form xuất hiện khi người dùng click vào call-to-action
- Có các floating buttons hỗ trợ tương tác nhanh
- Form liên hệ được tích hợp trên nhiều khu vực trong landing page

### 3.4. Gửi lead tới backend / webhook

Lead được submit qua service `leadService.js` và gửi đến Cloudflare Worker (hoặc webhook đã cấu hình qua biến môi trường). Dữ liệu có chứa:

- họ tên
- số điện thoại
- email
- message
- loại căn hộ
- source / form type
- thời gian submit
- tracking UTM và source URL

### 3.5. Tracking marketing / source attribution

File `src/utils/leadTracking.js` thu thập:

- `sourceUrl`
- các tham số UTM như `utm_source`, `utm_campaign`, `utm_medium`, `utm_content`, `utm_term`

Điều này giúp xác định nguồn khách hàng đến từ quảng cáo, landing page, hoặc kênh marketing nào.

### 3.6. Trang tin tức

Website có module tin tức với các chức năng:

- danh sách tin tức
- trang chi tiết bài viết
- lấy dữ liệu từ backend qua `newsService.js`
- format ngày tháng
- highlight và related articles

Routes bao gồm:

- `/` — trang chủ
- `/tin-tuc` — trang danh sách tin tức
- `/tin-tuc/:articleId` — trang chi tiết tin tức
- `/thank-you` — trang cảm ơn sau khi submit form

### 3.7. Hệ thống routing của React

Dùng `react-router-dom` để điều hướng giữa các màn hình:

- landing page
- tin tức
- chi tiết bài viết
- thank-you page

### 3.8. Tích hợp carousel và UI components

Dùng thư viện:

- `swiper` cho các slider / carousel
- `react-hot-toast` cho toast thông báo
- `react-router-dom` cho routing

### 3.9. Tính năng dữ liệu tĩnh và dữ liệu động

- Dữ liệu tin tức có thể được quản lý theo dạng data file `src/data/news.js`
- Dữ liệu động hiện đang được lấy từ backend API thông qua `newsService.js`
- Điều này giúp mô hình dễ chuyển đổi từ data mock sang CMS / API thật mà không cần đổi nhiều component

### 3.10. Xử lý form và tối ưu trải nghiệm

- validation dữ liệu ở frontend / service layer
- thông báo lỗi khi gửi thất bại
- ưu tiên UX khi người dùng submit thông tin và chuyển hướng tới trang cảm ơn

## 4. Công nghệ sử dụng

- React
- Vite
- React Router DOM
- Swiper
- ESLint
- CSS / SCSS-like component styling

## 5. Đặc điểm kỹ thuật nổi bật

- Landing page theo mô hình single-page app nhưng có route riêng cho tin tức
- Tách service layer rõ ràng: `services/` xử lý API và webhook
- Dữ liệu marketing được tracking theo nguồn và UTM
- UI được xây dựng theo modular component architecture
- tiện ích cho lead generation và conversion marketing

## 6. Endpoint / flow chính

```text
Trang chủ (/) -> các section giới thiệu dự án
    -> Popup / CTA -> submitLead() -> webhook / backend
    -> /tin-tuc -> tải danh sách bài viết từ API
    -> /tin-tuc/:articleId -> xem bài viết chi tiết
    -> /thank-you -> xác nhận gửi thông tin thành công
```

## 7. Ghi chú

Dự án này chủ yếu là marketing website / landing page cho dự án bất động sản, tập trung vào việc tăng tỷ lệ chuyển đổi qua lead capture, quảng bá dự án và cập nhật tin tức cho khách hàng.
