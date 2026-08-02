const imageModules = import.meta.glob(
  "../../assets/images/hinhanh/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
  },
);

const getImageSrc = (relativePath) => {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const fullPath = `../../assets/images/hinhanh/${normalizedPath}`;
  return imageModules[fullPath]?.default ?? "";
};

export const FILTERS = [
  { key: "canhquan", label: "Cảnh Quan" },
  { key: "congvien", label: "Công Viên" },
  { key: "phoicanh", label: "Phối Cảnh" },
];

export const GALLERY_ITEMS = [
  // ==========================
  // CẢNH QUAN
  // ==========================
  {
    category: "canhquan",
    src: getImageSrc("canhquan/1.png"),
    alt: "Phối cảnh Sông Lười Monrei Saigon từ trên cao",
    label: "Phối cảnh Sông Lười từ trên cao",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/2.png"),
    alt: "Tiện ích Thác Nước Mây Mưa độc đáo",
    label: "Thác nước Mây Mưa độc đáo",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/3.png"),
    alt: "Không gian sống chuẩn resort nội khu hơn 2ha",
    label: "Resort nội khu xanh mát hơn 2ha",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/4.png"),
    alt: "Hồ bơi Bio phong cách resort trải dài 500m",
    label: "Hồ bơi Bio phong cách resort 500m",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/5.png"),
    alt: "Hệ thống phun sương tự động điều hòa vi khí hậu",
    label: "Hệ thống phun sương tự động",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/6.png"),
    alt: "Hệ thống phun sương tự động điều hòa vi khí hậu",
    label: "Hệ thống phun sương tự động",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/7.png"),
    alt: "Hệ thống phun sương tự động điều hòa vi khí hậu",
    label: "Hệ thống phun sương tự động",
  },
  {
    category: "canhquan",
    src: getImageSrc("canhquan/8.png"),
    alt: "Hệ thống phun sương tự động điều hòa vi khí hậu",
    label: "Hệ thống phun sương tự động",
  },
  // ==========================
  // CÔNG VIÊN
  // ==========================
  {
    category: "congvien",
    src: getImageSrc("congvien/1.png"),
    alt: "Sân chơi nước Kodomo nhộn nhịp dành cho trẻ em",
    label: "Sân chơi nước Kodomo",
  },
  {
    category: "congvien",
    src: getImageSrc("congvien/2.png"),
    alt: "Phối cảnh sân chơi nước Kodomo từ trên cao",
    label: "Sân chơi nước Kodomo từ trên cao",
  },
  {
    category: "congvien",
    src: getImageSrc("congvien/3.png"),
    alt: "Chèo thuyền Kayak trên Dòng Sông Lười 88m và cầu dạo bộ trên cao",
    label: "Chèo Kayak trên Dòng Sông Lười 88m",
  },
  {
    category: "congvien",
    src: getImageSrc("congvien/4.png"),
    alt: "Tổ hợp 6.500m2 diện tích mặt nước hồ bơi",
    label: "Tổ hợp 6.500m2 mặt nước hồ bơi",
  },
  {
    category: "congvien",
    src: getImageSrc("congvien/5.png"),
    alt: "Tổ hợp 6.500m2 diện tích mặt nước hồ bơi",
    label: "Tổ hợp 6.500m2 mặt nước hồ bơi",
  },
  {
    category: "congvien",
    src: getImageSrc("congvien/6.png"),
    alt: "Tổ hợp 6.500m2 diện tích mặt nước hồ bơi",
    label: "Tổ hợp 6.500m2 mặt nước hồ bơi",
  },

  // ==========================
  // PHỐI CẢNH
  // ==========================
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/1.png"),
    alt: "Đường chạy bộ non-stop dưới tán cây xanh mát",
    label: "Đường chạy bộ non-stop dưới tán cây",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/2.png"),
    alt: "Phòng tập Pilates chuyên sâu chuẩn quốc tế",
    label: "Phòng tập Pilates chuyên sâu",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/3.png"),
    alt: "Khu thể thao ngoài trời Pocket Park hiện đại",
    label: "Khu thể thao ngoài trời Pocket Park",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/4.png"),
    alt: "Bể bơi trong nhà thiết kế gương kính phản chiếu sang trọng",
    label: "Bể bơi trong nhà gương kính sang trọng",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/5.png"),
    alt: "Phòng Gym hiện đại tiêu chuẩn quốc tế",
    label: "Phòng Gym hiện đại chuẩn quốc tế",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/6.png"),
    alt: "Phòng Gym hiện đại tiêu chuẩn quốc tế",
    label: "Phòng Gym hiện đại chuẩn quốc tế",
  },
  {
    category: "phoicanh",
    src: getImageSrc("phoicanh/7.png"),
    alt: "Phòng Gym hiện đại tiêu chuẩn quốc tế",
    label: "Phòng Gym hiện đại chuẩn quốc tế",
  },
];
