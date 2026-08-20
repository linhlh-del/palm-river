/**
 * ============================================================================
 *  DỮ LIỆU CẤU HÌNH — chỉnh ở đây, KHÔNG cần đụng vào MatBangTang.jsx.
 * ============================================================================
 */

import layout2pn from "../../assets/images/layout/2pn.jpg";
import layout3pn from "../../assets/images/layout/3pn.jpg";
import layout3pnGoc from "../../assets/images/layout/3pn-goc.jpg";
import layout2pnGoc from "../../assets/images/layout/2pn-goc.jpg";
import layout3pnDb from "../../assets/images/layout/3pn-db.jpg";
import layout2pnDb from "../../assets/images/layout/2pn-db.jpg";

// Kích thước gốc của ảnh mặt bằng (px). Toạ độ polygon bên dưới lấy đúng theo hệ này.
export const IMAGE_WIDTH = 5000;
export const IMAGE_HEIGHT = 3335;

// ============================================================================
// "Crop ảo" cho mobile — KHÔNG cắt file ảnh, KHÔNG vẽ lại toạ độ zones/chip.
// Component (MatBangTang.jsx) sẽ tự đồng bộ SVG viewBox + <img> theo đúng
// 4 số dưới đây, nên mọi polygon & legend chip tự trôi về đúng vị trí tương
// ứng trên vùng ảnh đã zoom. Truyền vào prop `mobileCrop`:
//   <MatBangTang mobileCrop={MOBILE_CROP} ... />
// Giá trị 0..1 = % muốn cắt bỏ ở mỗi cạnh (đã kiểm tra: với bộ ZONES + 12
// legend chip hiện tại, cắt trái 20% / trên-dưới 5% không đụng zone/chip
// nào). Nếu áp dụng cho view riêng từng tháp (TOWER_3/TOWER_4, có chip
// "2pn-goc" đặt ở left 17%) thì PHẢI chỉnh lại labelLeft của chip đó trước,
// nếu không chip sẽ bị crop cắt mất.
export const MOBILE_CROP = {
  left: 0.15,
  right: 0,
  top: 0.15,
  bottom: 0.075,
};

// 6 nhóm loại hình căn hộ — mỗi nhóm 1 màu riêng để phân biệt trên mặt bằng & chú giải.
// -> Đổi label/màu/ảnh đại diện tại đây.
// labelTop / labelLeft: toạ độ % để đặt "chip" chú giải NỔI TRÊN ẢNH (giống
// hintTop/hintLeft của TongThe) — không còn là hàng nút nằm dưới ảnh nữa.
// Sáu chip được chia thành 2 hàng, mỗi hàng 3 nút trên ảnh mặt bằng.
export const APARTMENT_TYPES = {
  "2pn": {
    label: "Căn hộ 2PN",
    short: "2PN",
    color: "#4DA8FF",
    image: layout2pn,
    desc: "Căn 2 phòng ngủ tiêu chuẩn, bố cục vuông vắn, tối ưu công năng.",
    labelTop: "12%",
    labelLeft: "17%",
  },
  "3pn": {
    label: "Căn hộ 3PN",
    short: "3PN",
    color: "#F2A65A",
    image: layout3pn,
    desc: "Căn 3 phòng ngủ, phù hợp gia đình nhiều thế hệ.",
    labelTop: "12%",
    labelLeft: "50%",
  },
  "3pn-goc": {
    label: "Căn hộ 3PN Góc",
    short: "3PN Góc",
    color: "#6FCF97",
    image: layout3pnGoc,
    desc: "Căn góc 3 phòng ngủ, 2 mặt thoáng, đón trọn tầm nhìn sông.",
    labelTop: "12%",
    labelLeft: "83%",
  },
  "2pn-goc": {
    label: "Căn hộ 2PN Góc",
    short: "2PN Góc",
    color: "#BB86FC",
    image: layout2pnGoc,
    desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
    labelTop: "88%",
    labelLeft: "17%",
  },
  "3pn-db": {
    label: "Căn hộ 3PN Đặc Biệt",
    short: "3PN Đặc Biệt",
    color: "#FFD166",
    image: layout3pnDb,
    desc: "Phiên bản giới hạn — diện tích lớn, mặt tiền hướng sông.",
    labelTop: "88%",
    labelLeft: "50%",
  },
  "2pn-db": {
    label: "Căn hộ 2PN Đặc Biệt",
    short: "2PN Đặc Biệt",
    color: "#FF6B81",
    image: layout2pnDb,
    desc: "Phiên bản giới hạn 2 phòng ngủ, layout độc bản trong toà.",
    labelTop: "88%",
    labelLeft: "83%",
  },
};

// Tạo bộ loại hình riêng cho từng tháp. Hai căn 2PN góc / 2PN Đặc Biệt dùng
// hai typeId khác nhau để hiển thị thành hai legend chip độc lập.
const createTowerApartmentTypes = (positions, typeIds) => {
  const types = {
    "2pn-goc": {
      ...APARTMENT_TYPES["2pn-goc"],
      label: "Căn hộ 2PN Góc ",
      short: "2PN Góc",
      ...positions["2pn-goc"],
    },
    "2pn-goc-2": {
      ...APARTMENT_TYPES["2pn-goc"],
      label: "Căn hộ 2PN Góc",
      short: "2PN Góc 2",
      ...positions["2pn-goc-2"],
    },
    "2pn-goc-120m": {
      ...APARTMENT_TYPES["2pn-goc"],
      label: "Căn hộ 2PN Góc 120m²",
      short: "2PN Góc 120m²",
      color: "#E6DEA7",
      ...positions["2pn-goc-120m"],
    },
    "2pn": {
      ...APARTMENT_TYPES["2pn"],
      ...positions["2pn"],
    },
    "2pn-db": {
      ...APARTMENT_TYPES["2pn-db"],
      ...positions["2pn-db"],
    },
    "2pn-db-2": {
      ...APARTMENT_TYPES["2pn-db"],
      label: "Căn hộ 2PN Đặc Biệt",
      short: "2PN Đặc Biệt 2",
      ...positions["2pn-db-2"],
    },
    "3pn": {
      ...APARTMENT_TYPES["3pn"],
      ...positions["3pn"],
    },
    "3pn-db": {
      ...APARTMENT_TYPES["3pn-db"],
      ...positions["3pn-db"],
    },
    "3pn-goc": {
      ...APARTMENT_TYPES["3pn-goc"],
      ...positions["3pn-goc"],
    },
  };

  return typeIds
    ? Object.fromEntries(typeIds.map((typeId) => [typeId, types[typeId]]))
    : types;
};

export const TOWER_3_APARTMENT_TYPES = createTowerApartmentTypes(
  {
    "2pn-goc": { labelTop: "12%", labelLeft: "17%" },
    "2pn-goc-2": { labelTop: "88%", labelLeft: "80%" },
    "2pn-goc-120m": { labelTop: "12%", labelLeft: "78%" },
    "2pn": { labelTop: "12%", labelLeft: "55%" },
    "3pn": { labelTop: "88%", labelLeft: "50%" },
    "3pn-goc": { labelTop: "88%", labelLeft: "17%" },
  },
  ["2pn-goc", "2pn-goc-2", "2pn-goc-120m", "2pn", "3pn", "3pn-goc"],
);

export const TOWER_4_APARTMENT_TYPES = createTowerApartmentTypes(
  {
    "2pn-goc": { labelTop: "10%", labelLeft: "17%", color: "#DCDCDC" },
    "2pn": { labelTop: "10%", labelLeft: "50%", color: "#D6C47A" },
    "2pn-db": { labelTop: "10%", labelLeft: "83%", color: "#767667" },
    "2pn-db-2": { labelTop: "90%", labelLeft: "17%", color: "#DAC2A8" },
    "3pn": { labelTop: "90%", labelLeft: "50%", color: "#C89A70" },
    "3pn-db": { labelTop: "90%", labelLeft: "83%", color: "#6EBCC9" },
  },
  ["2pn-goc", "2pn", "2pn-db", "2pn-db-2", "3pn", "3pn-db"],
);

// 12 legend chip độc lập cho mặt bằng tổng thể. Chỉnh trực tiếp từng hằng
// bên dưới; không gộp cấu hình vị trí của Tháp 3 và Tháp 4 vào một object.
export const T3_2PN_GOC_CHIP = {
  id: "t3-2pn-goc",
  label: "Căn hộ 2PN Góc | 84,9m²",
  short: "2PN Góc | 84,9m²",
  color: "#BB86FC",
  image: layout2pnGoc,
  desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
  area: 84.9,
  labelTop: "31%",
  labelLeft: "65%",
};
export const T3_2PN_GOC_2_CHIP = {
  id: "t3-2pn-goc-2",
  label: "Căn hộ 2PN Góc | 84,9m²",
  short: "2PN Góc | 84,9m²",
  color: "#BB86FC",
  image: layout2pnGoc,
  desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
  area: 84.9,
  labelTop: "59%",
  labelLeft: "58%",
};
export const T3_2PN_GOC_120M_CHIP = {
  id: "t3-2pn-goc-120m",
  label: "Căn hộ 2PN Góc | 120,2m²",
  short: "2PN Góc | 120,2m²",
  color: "#E6DEA7",
  image: layout2pnGoc,
  desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
  area: 120.2,
  labelTop: "48%",
  labelLeft: "72%",
};
export const T3_2PN_CHIP = {
  id: "t3-2pn",
  label: "Căn hộ 2PN | 85,9m²",
  short: "2PN | 85,9m²",
  color: "#4DA8FF",
  image: layout2pn,
  desc: "Căn 2 phòng ngủ tiêu chuẩn, bố cục vuông vắn, tối ưu công năng.",
  area: 85.9,
  labelTop: "40%",
  labelLeft: "68%",
};
export const T3_3PN_CHIP = {
  id: "t3-3pn",
  label: "Căn hộ 3PN | 126,1m²",
  short: "3PN | 126,1m²",
  color: "#F2A65A",
  image: layout3pn,
  desc: "Căn 3 phòng ngủ, phù hợp gia đình nhiều thế hệ.",
  area: 126.1,
  labelTop: "49%",
  labelLeft: "54%",
};
export const T3_3PN_GOC_CHIP = {
  id: "t3-3pn-goc",
  label: "Căn hộ 3PN Góc | 125,3m²",
  short: "3PN Góc | 125,3m²",
  color: "#6FCF97",
  image: layout3pnGoc,
  desc: "Căn góc 3 phòng ngủ, 2 mặt thoáng, đón trọn tầm nhìn sông.",
  area: 125.3,
  labelTop: "41%",
  labelLeft: "50%",
};
// Chip T4
export const T4_2PN_GOC_CHIP = {
  id: "t4-2pn-goc",
  label: "Căn hộ 2PN Góc | 84,9m²",
  short: "2PN Góc | 84,9m²",
  color: "#DCDCDC",
  image: layout2pnGoc,
  desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
  area: 84.9,
  labelTop: "57%",
  labelLeft: "74%",
};
export const T4_2PN_CHIP = {
  id: "t4-2pn",
  label: "Căn hộ 2PN | 85,9m²",
  short: "2PN | 85,9m²",
  color: "#D6C47A",
  image: layout2pn,
  desc: "Căn 2 phòng ngủ tiêu chuẩn, bố cục vuông vắn, tối ưu công năng.",
  area: 85.9,
  labelTop: "63%",
  labelLeft: "80%",
};
export const T4_2PN_DB_CHIP = {
  id: "t4-2pn-db-121",
  label: "Căn hộ 2PN Đặc Biệt | 121,9m²",
  short: "2PN Đặc Biệt | 121,9m²",
  color: "#767667",
  image: layout2pnDb,
  desc: "Phiên bản giới hạn 2 phòng ngủ, layout độc bản trong tòa.",
  area: 121.9,
  labelTop: "69%",
  labelLeft: "89%",
};
export const T4_2PN_DB_2_CHIP = {
  id: "t4-2pn-db-120",
  label: "Căn hộ 2PN Đặc Biệt | 120,2m²",
  short: "2PN Đặc Biệt | 120,2m²",
  color: "#DAC2A8",
  image: layout2pnDb,
  desc: "Phiên bản giới hạn 2 phòng ngủ, layout độc bản trong tòa.",
  area: 120.2,
  labelTop: "86%",
  labelLeft: "78%",
};
export const T4_3PN_CHIP = {
  id: "t4-3pn",
  label: "Căn hộ 3PN | 126,1m²",
  short: "3PN | 126,1m²",
  color: "#C89A70",
  image: layout3pn,
  desc: "Căn 3 phòng ngủ, phù hợp gia đình nhiều thế hệ.",
  area: 126.1,
  labelTop: "79%",
  labelLeft: "68%",
};
export const T4_3PN_DB_CHIP = {
  id: "t4-3pn-db",
  label: "Căn hộ 3PN Đặc Biệt | 157,0m²",
  short: "3PN Đặc Biệt | 157,0m²",
  color: "#6EBCC9",
  image: layout3pnDb,
  desc: "Phiên bản giới hạn - diện tích lớn, mặt tiền hướng sông.",
  area: 157.0,
  labelTop: "70%",
  labelLeft: "58%",
};

export const ZONES = [
  {
    id: "layout-1",
    code: "Căn hộ 2PN Góc | 84.9m²",
    typeId: "2pn-goc",
    area: 62,
    ratio: 14,
    priceFrom: 2.8,
    priceTo: 3.1,
    points:
      "3628.5,2071.7 3521.4,2018.1 3504.9,2009.9 3484.3,2009.9 3463.8,2022.2 3410.2,2108.7 3451.4,2137.6 3418.5,2195.2 3492.6,2244.7 3504.9,2219.9 3542.0,2232.3",
    chipId: "t4-2pn-goc",
  },
  {
    id: "layout-2",
    code: "Căn hộ 2PN | 85.9m²",
    typeId: "2pn",
    area: 86,
    ratio: 11,
    priceFrom: 3.6,
    priceTo: 3.9,
    points:
      "3826.2,2187.0 3764.4,2298.2 3805.6,2327.0 3785.0,2364.1 3888.0,2417.6 3978.6,2265.2",
    chipId: "t4-2pn",
  },
  {
    id: "layout-3",
    code: "Căn hộ 3PN Góc",
    typeId: "3pn-goc",
    area: 94,
    ratio: 9,
    priceFrom: 4.1,
    priceTo: 4.5,
    points:
      "3982.7,2273.5 3896.2,2421.8 3958.0,2458.8 4040.4,2500.0 4073.3,2471.2 4122.7,2491.8 4168.0,2409.4 4180.4,2388.8 4172.2,2368.2 4139.2,2351.7",
    chipId: "t4-2pn-db-121", // 2pn db 121
  },
  {
    id: "layout-4",
    code: "Căn hộ 2PN Góc",
    typeId: "2pn-goc",
    area: 68,
    ratio: 13,
    priceFrom: 3.0,
    priceTo: 3.3,
    points:
      "3336.1,2166.4 3278.4,2277.6 3274.3,2322.9 3303.1,2355.9 3509.1,2454.7 3599.7,2298.2",
    chipId: "t4-3pn-db", // 3pn
  },
  {
    id: "layout-5",
    code: "Căn hộ 3PN Đặc Biệt",
    typeId: "3pn-db",
    area: 108,
    ratio: 5,
    priceFrom: 5.2,
    priceTo: 5.8,
    points:
      "3607.9,2306.4 3521.4,2462.9 3723.2,2561.8 3793.2,2462.9 3731.5,2421.8 3747.9,2380.6",
    chipId: "t4-3pn",
  },
  {
    id: "layout-6",
    code: "Căn hộ 2PN Đặc Biệt",
    typeId: "2pn-db",
    area: 74,
    ratio: 6,
    priceFrom: 3.4,
    priceTo: 3.7,
    points:
      "3888.0,2458.8 3805.6,2611.2 3892.1,2664.8 3999.2,2710.1 4081.5,2570.0",
    chipId: "t4-2pn-db-120", //done t4
  },
  {
    id: "layout-7",
    code: "Căn hộ 2PN",
    typeId: "2pn",
    area: 60,
    ratio: 14,
    priceFrom: 2.7,
    priceTo: 3.0,
    points:
      "3319.6,1544.5 3171.3,1643.3 3286.7,1828.7 3311.4,1836.9 3332.0,1828.7 3422.6,1779.3 3430.8,1750.4 3426.7,1713.4",
    chipId: "t3-2pn-goc-120m",
  },
  {
    id: "layout-8", // cần fix lại màu zone
    code: "Căn hộ 3PN",
    typeId: "3pn",
    area: 88,
    ratio: 11,
    priceFrom: 3.7,
    priceTo: 4.0,
    points: "3311.4,1536.3 3204.3,1367.4 3051.9,1462.1 3163.1,1635.1",
    chipId: "t3-2pn",
  },
  {
    id: "layout-9",
    code: "Căn hộ 3PN Góc",
    typeId: "3pn-goc",
    area: 96,
    ratio: 9,
    priceFrom: 4.2,
    priceTo: 4.6,
    points:
      "3138.4,1280.9 3027.2,1091.4 3014.8,1079.1 2994.2,1062.6 2948.9,1075.0 2891.3,1112.0 2916.0,1161.5 2878.9,1186.2 2924.2,1260.3 2998.4,1371.5",
    chipId: "t3-2pn-goc",
  },
  {
    id: "layout-10",
    code: "Căn hộ 2PN Góc",
    typeId: "2pn-goc",
    area: 70,
    ratio: 13,
    priceFrom: 3.1,
    priceTo: 3.4,
    points:
      "3134.3,1663.9 2986.0,1754.5 3093.1,1931.6 3117.8,1944.0 3154.9,1931.6 3220.8,1882.2 3200.2,1836.9 3233.1,1812.2",
    chipId: "t3-2pn-goc-2",
  },
  {
    id: "layout-11",
    code: "Căn hộ 3PN Đặc Biệt",
    typeId: "3pn-db",
    area: 110,
    ratio: 5,
    priceFrom: 5.4,
    priceTo: 6.0,
    points:
      "2973.6,1404.5 2829.5,1499.2 2965.4,1717.5 3076.6,1651.6 3035.4,1577.4 3072.5,1565.1",
    chipId: "t3-3pn",
  },
  {
    id: "layout-12",
    code: "Căn hộ 2PN Đặc Biệt",
    typeId: "2pn-db",
    area: 76,
    ratio: 6,
    priceFrom: 3.5,
    priceTo: 3.8,
    points:
      "2870.7,1252.1 2837.7,1268.5 2796.5,1210.9 2718.3,1260.3 2705.9,1272.7 2697.7,1293.3 2710.0,1322.1 2751.2,1379.7 2821.3,1495.1 2965.4,1400.3",
    chipId: "t3-3pn-goc",
  },
];
