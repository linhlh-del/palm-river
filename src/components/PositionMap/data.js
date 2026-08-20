import layout2pn from "../../assets/images/layout/2pn.jpg";
import layout3pn from "../../assets/images/layout/3pn.jpg";
import layout3pnGoc from "../../assets/images/layout/3pn-goc.jpg";
import layout2pnGoc from "../../assets/images/layout/2pn-goc.jpg";
import layout3pnDb from "../../assets/images/layout/3pn-db.jpg";
import layout2pnDb from "../../assets/images/layout/2pn-db.jpg";

const BASE_APARTMENT_TYPES = {
  "2pn": {
    label: "Căn hộ 2PN",
    short: "2PN",
    color: "#4DA8FF",
    image: layout2pn,
    desc: "Căn 2 phòng ngủ tiêu chuẩn, bố cục vuông vắn, tối ưu công năng.",
  },
  "3pn": {
    label: "Căn hộ 3PN",
    short: "3PN",
    color: "#F2A65A",
    image: layout3pn,
    desc: "Căn 3 phòng ngủ, phù hợp gia đình nhiều thế hệ.",
  },
  "3pn-goc": {
    label: "Căn hộ 3PN Góc",
    short: "3PN Góc",
    color: "#6FCF97",
    image: layout3pnGoc,
    desc: "Căn góc 3 phòng ngủ, 2 mặt thoáng, đón trọn tầm nhìn sông.",
  },
  "2pn-goc": {
    label: "Căn hộ 2PN Góc",
    short: "2PN Góc",
    color: "#BB86FC",
    image: layout2pnGoc,
    desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
  },
  "3pn-db": {
    label: "Căn hộ 3PN Đặc Biệt",
    short: "3PN Đặc Biệt",
    color: "#FFD166",
    image: layout3pnDb,
    desc: "Phiên bản giới hạn - diện tích lớn, mặt tiền hướng sông.",
  },
  "2pn-db": {
    label: "Căn hộ 2PN Đặc Biệt",
    short: "2PN Đặc Biệt",
    color: "#FF6B81",
    image: layout2pnDb,
    desc: "Phiên bản giới hạn 2 phòng ngủ, layout độc bản trong tòa.",
  },
};

// `area`: diện tích chính xác (m²) — đồng bộ theo file data.js dùng cho
// Mặt Bằng Tầng (các hằng T3_*_CHIP / T4_*_CHIP). Chỉ chép giá trị qua,
// KHÔNG import chung file để 2 luồng (Tiện ích / Mặt bằng tầng) độc lập
// nhau, tránh 1 bên sửa làm vỡ bên kia.
const createTowerApartmentTypes = (positions, typeIds) => {
  const types = {
    "2pn-goc": {
      ...BASE_APARTMENT_TYPES["2pn-goc"],
      ...positions["2pn-goc"],
    },
    "2pn-goc-2": {
      ...BASE_APARTMENT_TYPES["2pn-goc"],
      label: "Căn hộ 2PN Góc",
      short: "2PN Góc 2",
      ...positions["2pn-goc-2"],
    },
    "2pn-goc-120m": {
      ...BASE_APARTMENT_TYPES["2pn-goc"],
      label: "Căn hộ 2PN Góc 120m²",
      short: "2PN Góc 120m²",
      color: "#E6DEA7",
      ...positions["2pn-goc-120m"],
    },
    "2pn": {
      ...BASE_APARTMENT_TYPES["2pn"],
      ...positions["2pn"],
    },
    "2pn-db": {
      ...BASE_APARTMENT_TYPES["2pn-db"],
      ...positions["2pn-db"],
    },
    "2pn-db-2": {
      ...BASE_APARTMENT_TYPES["2pn-db"],
      label: "Căn hộ 2PN Đặc Biệt",
      short: "2PN Đặc Biệt 2",
      ...positions["2pn-db-2"],
    },
    "3pn": {
      ...BASE_APARTMENT_TYPES["3pn"],
      ...positions["3pn"],
    },
    "3pn-db": {
      ...BASE_APARTMENT_TYPES["3pn-db"],
      ...positions["3pn-db"],
    },
    "3pn-goc": {
      ...BASE_APARTMENT_TYPES["3pn-goc"],
      ...positions["3pn-goc"],
    },
  };

  return Object.fromEntries(typeIds.map((typeId) => [typeId, types[typeId]]));
};

export const TIEN_ICH_APARTMENT_TYPES = BASE_APARTMENT_TYPES;

export const TOWER_3_APARTMENT_TYPES = createTowerApartmentTypes(
  {
    "2pn-goc": { labelTop: "12%", labelLeft: "17%", area: 84.9 },
    "2pn-goc-2": { labelTop: "88%", labelLeft: "80%", area: 84.9 },
    "2pn-goc-120m": { labelTop: "12%", labelLeft: "78%", area: 120.2 },
    "2pn": { labelTop: "12%", labelLeft: "55%", area: 85.9 },
    "3pn": { labelTop: "88%", labelLeft: "50%", area: 126.1 },
    "3pn-goc": { labelTop: "88%", labelLeft: "17%", area: 125.3 },
  },
  ["2pn-goc", "2pn-goc-2", "2pn-goc-120m", "2pn", "3pn", "3pn-goc"],
);

export const TOWER_4_APARTMENT_TYPES = createTowerApartmentTypes(
  {
    "2pn-goc": {
      labelTop: "10%",
      labelLeft: "17%",
      color: "#DCDCDC",
      area: 84.9,
    },
    "2pn": { labelTop: "10%", labelLeft: "50%", color: "#D6C47A", area: 85.9 },
    "2pn-db": {
      labelTop: "10%",
      labelLeft: "83%",
      color: "#767667",
      area: 121.9,
    },
    "2pn-db-2": {
      labelTop: "90%",
      labelLeft: "17%",
      color: "#DAC2A8",
      area: 120.2,
    },
    "3pn": {
      labelTop: "90%",
      labelLeft: "50%",
      color: "#C89A70",
      area: 126.1,
    },
    "3pn-db": {
      labelTop: "90%",
      labelLeft: "83%",
      color: "#6EBCC9",
      area: 157.0,
    },
  },
  ["2pn-goc", "2pn", "2pn-db", "2pn-db-2", "3pn", "3pn-db"],
);
