// Dữ liệu tin tức & sự kiện Palm City
// Tách riêng khỏi component để dễ dàng thay bằng dữ liệu từ API/CMS sau này

import n1 from "../../../assets/images/news/1.webp";
import n2 from "../../../assets/images/news/2.webp";
import n3 from "../../../assets/images/news/3.webp";
import n4 from "../../../assets/images/news/4.webp";
import n5 from "../../../assets/images/news/5.webp";
import n6 from "../../../assets/images/news/6.webp";
import n7 from "../../../assets/images/news/7.webp";
import n8 from "../../../assets/images/news/8.webp";
import n9 from "../../../assets/images/news/9.webp";

export const NAV_LINKS = [
  {
    label: "Phân khu",
    href: "#",
    children: [
      { label: "Palm River", href: "#" },
      { label: "Palm Height", href: "#" },
      { label: "Palm Residence", href: "#" },
      { label: "Trường Quốc tế Mỹ", href: "#" },
    ],
  },
  { label: "Tin tức & sự kiện", href: "#", active: true },
  { label: "Thư viện", href: "#" },
  { label: "Liên hệ với chúng tôi", href: "#" },
];

export const FEATURED_NEWS = {
  id: "tin-hieu-tich-cuc-phap-ly",
  title: "Những tín hiệu tích cực về pháp lý và triển khai của Palm City",
  excerpt:
    "Việc khởi công phân khu Palm River mới đây được xem là dấu mốc mở đầu cho giai đoạn phát triển tiếp theo của Palm City, khu đô thị quy...",
  tag: "Tin tức",
  date: "07.08.2026",
  image: n1,
  href: "/tin-tuc/tin-hieu-tich-cuc-phap-ly",
};

export const HIGHLIGHT_NEWS = [
  {
    id: "xu-huong-do-thi-duong",
    title:
      'Palm City và xu hướng "đô thị nghỉ dưỡng giữa lòng thành phố" tại khu Đông TP.HCM',
    tag: "Sự kiện",
    date: "07.06.2026",
    href: "/tin-tuc/xu-huong-do-thi-duong",
  },
  {
    id: "ra-mat-phan-khu-cao-tang",
    title: "Palm City ra mắt phân khu cao tầng đầu tiên",
    tag: "Tin tức",
    date: "07.06.2026",
    href: "/tin-tuc/ra-mat-phan-khu-cao-tang",
  },
];

export const NEWS_GRID = [
  {
    id: "xu-huong-do-thi-duong",
    title:
      'Palm City và xu hướng "đô thị nghỉ dưỡng giữa lòng thành phố" tại khu Đông TPHCM',
    excerpt:
      "Trong nhiều năm, phát triển đô thị tại TP.HCM được đo bằng tốc độ mở rộng không gian và nguồn cung nhà ở. Tuy nhiên, khi đô thị bước vào giai đoạn phát triển theo chiều sâu, chất lượng sống đang trở thành một trong những tiêu chí được quan tâm khi lựa chọn nơi an cư.",
    tag: "Sự kiện",
    date: "06/07/2026",
    image: n2,
    href: "/tin-tuc/xu-huong-do-thi-duong",
  },
  {
    id: "giai-doan-phat-trien-moi",
    title:
      "Palm City bước vào giai đoạn phát triển mới với nhiều chuyển động tích cực",
    excerpt:
      "Dự án Palm City đang bước vào giai đoạn phát triển mới khi phân khu Palm River chính thức khởi công, đồng thời đẩy mạnh đầu tư hạ tầng, hoàn thiện pháp lý cho các phân khu hiện hữu. Doanh nghiệp khẳng định minh bạch và phát triển dự án theo hướng bền vững.",
    tag: "Tin tức",
    date: "06/07/2026",
    image: n3,
    href: "/tin-tuc/giai-doan-phat-trien-moi",
  },
  {
    id: "ra-mat-phan-khu-cao-tang",
    title: "Palm City ra mắt phân khu cao tầng đầu tiên",
    excerpt:
      "Palm River là phân khu cao tầng đầu tiên được triển khai trong giai đoạn phát triển mới của khu đô thị Palm City (quy mô 30,2 ha) tại phường Bình Trưng, TP HCM.",
    tag: "Tin tức",
    date: "06/07/2026",
    image: n4,
    href: "/tin-tuc/ra-mat-phan-khu-cao-tang",
  },
  {
    id: "khoi-cong-palm-river",
    title:
      "Về tay đơn vị phát triển mới, Palm City khởi công phân khu Palm River",
    excerpt:
      "Hướng Việt Properties vừa tổ chức khởi công phân khu Palm River vào ngày 16.6, đánh dấu giai đoạn phát triển mới của Palm City, khu đô thị quy mô 30,2 ha tại phường Bình Trưng (Quận 2 cũ), TP.HCM.",
    tag: "Tin tức",
    date: "06/07/2026",
    image: n5,
    href: "/tin-tuc/khoi-cong-palm-river",
  },
  {
    id: "khong-gian-song-ven-song",
    title:
      "Palm River: Không gian sống ven sông hiếm hoi đang dần thành hình ở khu đông TP.HCM",
    excerpt: "",
    tag: "Tin tức",
    date: "06/07/2026",
    image: n6,
    href: "/tin-tuc/khong-gian-song-ven-song",
  },
  {
    id: "them-chuyen-dong-moi",
    title:
      "Thêm chuyển động mới tại khu Đông TPHCM: Palm City triển khai phân khu Palm River",
    excerpt: "Nguồn: Thanh Mẫn - Báo Lao Động",
    tag: "Sự kiện",
    date: "27/06/2026",
    image: n7,
    href: "/tin-tuc/them-chuyen-dong-moi",
  },
  {
    id: "cuc-tang-truong-moi",
    title:
      "Palm City khởi công Palm River, cực tăng trưởng mới của thị trường dần lộ diện",
    excerpt:
      "(ĐTCK) Cùng với những chuyển động mới về hạ tầng tại khu Đông TP.HCM, Palm City cũng bước vào giai đoạn phát triển mới với việc khởi công phân khu Palm River. Cột mốc này không chỉ khẳng định tiến độ triển khai, mà còn góp phần đưa Palm City trở thành một cực tăng trưởng mới của thị trường bất động sản.",
    tag: "Sự kiện",
    date: "26/06/2026",
    image: n8,
    href: "/tin-tuc/cuc-tang-truong-moi",
  },
  {
    id: "mot-trong-nhung-quy-dat-ven-song",
    title:
      "Một trong những quỹ đất ven sông lớn hiếm hoi gần Thủ Thiêm bắt đầu chuyển động trở lại",
    excerpt: "Nguồn: Ánh Dương - Cafe F",
    tag: "Tin tức",
    date: "19/06/2026",
    image: n9,
    href: "/tin-tuc/mot-trong-nhung-quy-dat-ven-song",
  },
];

export const FOOTER_CONTACT = [
  {
    label: "(A): Đường Song Hành, P. Bình Trưng (Quận 2 cũ), TPHCM",
    socialLabel: "Facebook",
    socialHref: "https://www.facebook.com/PalmCityOfficial.HVP",
  },
  {
    label: "(T): (+84) 96 69 090 86",
    socialLabel: "Youtube",
    socialHref: "https://www.youtube.com/@palmcityofficial",
  },
  {
    label: "(E): sales@palm-city.com.vn",
    socialLabel: "Instagram",
    socialHref: "https://www.instagram.com/palmcityofficial.hvp/",
  },
];
