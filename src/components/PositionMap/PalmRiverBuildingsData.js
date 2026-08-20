// ⚠️ 4 toà nhà bên trong vùng "PALM RIVER" trên bản đồ tiện ích (TienIch).
// - `d`: path SVG của từng toà, PHẢI cùng hệ toạ độ viewBox 1680x900 với
//   svg overlay chính trong TienIch.jsx. Toạ độ dưới đây là placeholder
//   (4 ô vuông nhỏ nằm trong bbox vùng "PALM RIVER" gốc, id="1" trong
//   AREAS) — thay bằng path thật lấy từ file thiết kế (Figma/AI export).
//
// - `mapPosition`: vị trí đặt ảnh mặt bằng tầng (floor-plan overlay) ĐÈ
//   LÊN sân thượng của toà, tính theo hệ toạ độ 1680x900 (giống `d`).
//   x/y = góc trên-trái, width/height = kích thước hiển thị trên map.
//   Đo bằng cách xác định bbox của "nóc" toà nhà trên ảnh amen-map-4.jpg.
//
// - `viewBox`: kích thước pixel GỐC của ảnh mặt bằng đã cắt riêng cho toà
//   này (ảnh floorImage). Toạ độ `points` của từng zone bên dưới phải
//   theo đúng hệ pixel này — giống hệt cách IMAGE_WIDTH/IMAGE_HEIGHT +
//   ZONES.points hoạt động trong MatBang/data.js.
//
// - `floorImage`: import ảnh mặt bằng tầng đã cắt (webp/jpg), đặt trong
//   assets/images/matbang/. Ảnh nên vuông hoặc theo đúng tỉ lệ viewBox
//   để không bị méo khi preserveAspectRatio="xMidYMid slice".
//
// - `zones`: danh sách căn hộ trong toà, mỗi zone gồm toạ độ polygon +
//   thông tin hiển thị popup. `typeId` tham chiếu tới APARTMENT_TYPES
//   trong MatBang/data.js (dùng chung màu sắc/label, không định nghĩa lại).
//
// - `matBangProps`: GIỮ LẠI để tương thích ngược nếu bạn còn dùng modal
//   MatBangTang cũ ở nơi khác. Với luồng overlay-trực-tiếp mới (đè ảnh
//   lên sân thượng + panel neo cố định), field này không còn bắt buộc.

import floorToa3 from "../../assets/images/matbang/thap-3.jpg";
import floorToa4 from "../../assets/images/matbang/thap-4.jpg";
import { TOWER_3_APARTMENT_TYPES, TOWER_4_APARTMENT_TYPES } from "./data.js";

const TOWER_IMAGE_WIDTH = 4572;
const TOWER_IMAGE_HEIGHT = 1993;

/**
 * ============================================================
 * THÁP 3
 * ============================================================
 *
 * Giữ nguyên toàn bộ points hiện tại của Tháp 3.
 */
const TOWER_ZONES = (prefix, typeIds) => [
  {
    id: `${prefix}-01`,
    code: `${prefix.toUpperCase()}-01`,
    typeId: typeIds[0],
    area: 62,
    ratio: 14,
    priceFrom: 2.8,
    priceTo: 3.1,
    points:
      "1484.5,67.6 412.6,67.6 284.1,67.6 209.7,87.9 158.9,138.7 145.4,230.0 138.6,686.5 375.4,686.5 382.1,899.5 1484.5,896.2",
  },

  {
    id: `${prefix}-02`,
    code: `${prefix.toUpperCase()}-02`,
    typeId: typeIds[1],
    area: 86,
    ratio: 11,
    priceFrom: 3.6,
    priceTo: 3.9,
    points:
      "2938.7,1072.0 2938.7,1914.1 3909.2,1914.1 4003.9,1883.6 4051.2,1822.8 4071.5,1755.1 4064.8,1281.7 3817.9,1278.3 3811.1,1061.9",
  },

  {
    id: `${prefix}-03`,
    code: `${prefix.toUpperCase()}-03`,
    typeId: typeIds[2],
    area: 94,
    ratio: 9,
    priceFrom: 4.1,
    priceTo: 4.5,
    points:
      "4068.1,899.5 4074.9,216.4 4071.5,169.1 4051.2,121.7 4003.9,81.2 3929.5,60.9 2955.6,54.1 2952.2,902.9",
  },

  {
    id: `${prefix}-04`,
    code: `${prefix.toUpperCase()}-04`,
    typeId: typeIds[3],
    area: 68,
    ratio: 13,
    priceFrom: 3.0,
    priceTo: 3.3,
    points:
      "2938.7,71.0 2100.0,54.1 2096.6,689.9 2343.5,689.9 2343.5,899.5 2952.2,902.9",
  },

  {
    id: `${prefix}-05`,
    code: `${prefix.toUpperCase()}-05`,
    typeId: typeIds[4],
    area: 108,
    ratio: 5,
    priceFrom: 5.2,
    priceTo: 5.8,
    points:
      "1528.5,1072.0 1528.5,1903.9 2769.6,1903.9 2776.3,1271.5 2394.2,1278.3 2397.6,1068.6",
  },

  {
    id: `${prefix}-06`,
    code: `${prefix.toUpperCase()}-06`,
    typeId: typeIds[5],
    area: 74,
    ratio: 6,
    priceFrom: 3.4,
    priceTo: 3.7,
    points:
      "1511.6,1072.0 642.5,1061.9 656.0,1271.5 280.7,1271.5 284.1,1745.0 287.4,1785.6 301.0,1832.9 338.2,1863.3 378.7,1893.8 439.6,1907.3 1518.4,1910.7",
  },
];

/**
 * ============================================================
 * THÁP 4
 * ============================================================
 *
 * Ảnh HTML gốc:
 *
 * viewBox="0 0 755 327"
 *
 * Đã convert sang:
 *
 * viewBox="0 0 4572 1993"
 *
 * Scale:
 *
 * X = 4572 / 755
 * Y = 1993 / 327
 *
 * Các polygon lấy trực tiếp từ HTML bạn cung cấp.
 *
 * LƯU Ý:
 * HTML hiện tại chỉ cung cấp 3 polygon thực tế.
 * Vì Tháp 4 có tổng cộng 6 layout nên 3 polygon còn lại
 * được giữ riêng để bổ sung points chính xác sau khi có
 * phần còn lại của bản vẽ.
 */

/**
 * Tháp 4 - Layout 2PN-DB
 *
 * HTML gốc:
 *
 * 531.5,173.0
 * 535.5,306.0
 * 693.5,306.0
 * 710.5,300.0
 * 717.5,288.0
 * 715.5,174.0
 *
 * Converted:
 *
 * 3216.5,1054.3
 * 3239.7,1864.3
 * 4198.8,1864.3
 * 4301.7,1827.7
 * 4344.1,1754.5
 * 4332.0,1060.4
 */

/**
 * Tháp 4 - Layout 3PN
 *
 * HTML gốc:
 *
 * 258.5,174.0
 * 257.5,306.0
 * 465.5,307.0
 * 462.5,207.0
 * 401.5,205.0
 * 402.5,176.0
 *
 * Converted:
 *
 * 1565.0,1062.3
 * 1558.9,1864.3
 * 2816.6,1870.4
 * 2798.4,1262.9
 * 2430.7,1250.7
 * 2436.8,1074.5
 */

/**
 * Tháp 4 - Layout 3PN-DB
 *
 * HTML gốc:
 *
 * 17.5,174.0
 * 17.5,276.0
 * 18.5,288.0
 * 22.5,299.0
 * 35.5,306.0
 * 67.5,307.0
 * 250.5,306.0
 * 251.5,173.0
 *
 * Converted:
 *
 * 106.0,1060.4
 * 106.0,1683.0
 * 112.1,1756.2
 * 136.3,1823.4
 * 215.2,1864.3
 * 408.3,1870.4
 * 1515.3,1864.3
 * 1521.3,1054.3
 */

// Thêm cạnh TOWER_ZONES, dùng riêng cho Tháp 4 (chỉ 3 loại căn)
// ⚠️ Toạ độ placeholder — cần đo lại theo ảnh thap-4.jpg thật (4572x1993)
const TOWER_4_ZONES = [
  {
    id: "thap-4-01",
    code: "THAP-4-2PN-GÓC",
    typeId: "2pn-goc",
    area: 68, // TODO: điền diện tích thật
    ratio: 13, // TODO: điền tỷ lệ thật
    priceFrom: 3.0, // TODO: điền giá thật
    priceTo: 3.3,
    points:
      "1177.8,103.6 493.5,85.3 378.5,121.9 330.0,256.0 317.9,682.6 554.1,682.6 584.4,908.1 1171.8,908.1",
  },
  {
    id: "thap-4-02",
    code: "THAP-4-2PN",
    typeId: "2pn",
    area: 60, // TODO: điền diện tích thật
    ratio: 14, // TODO: điền tỷ lệ thật
    priceFrom: 2.7, // TODO: điền giá thật
    priceTo: 3.0,
    points:
      "3133.8,97.5 2304.2,85.3 2316.3,682.6 2552.4,682.6 2570.6,908.1 3145.9,908.1",
  },
  {
    id: "thap-4-03",
    code: "THAP-4-2PN-ĐB-1",
    typeId: "2pn-db",
    area: 62, // TODO: điền diện tích thật
    ratio: 12, // TODO: điền tỷ lệ thật
    priceFrom: 2.9, // TODO: điền giá thật
    priceTo: 3.2,
    points:
      "3218.6,1054.4 3242.8,1865.0 4199.6,1865.0 4302.5,1828.4 4344.9,1755.3 4332.8,1060.5",
  },
  {
    id: "thap-4-04",
    code: "THAP-4-2PN-ĐB-2",
    typeId: "2pn-db-2",
    area: 62, // TODO: điền diện tích thật
    ratio: 5, // TODO: điền tỷ lệ thật
    priceFrom: 3.0, // TODO: điền giá thật
    priceTo: 3.3,
    points:
      "3164.1,91.4 3170.1,908.1 4066.3,902.0 4066.3,682.6 4357.0,688.7 4363.1,231.6 4314.6,134.1 4132.9,97.5",
  },
  {
    id: "thap-4-05",
    code: "THAP-4-3PN",
    typeId: "3pn",
    area: 88, // TODO: điền diện tích thật
    ratio: 11, // TODO: điền tỷ lệ thật
    priceFrom: 3.7, // TODO: điền giá thật
    priceTo: 4.0,
    points:
      "1565.4,1060.5 1559.3,1865.0 2818.9,1871.1 2800.7,1261.6 2431.3,1249.4 2437.4,1072.7",
  },
  {
    id: "thap-4-06",
    code: "THAP-4-3PN-ĐB",
    typeId: "3pn-db",
    area: 108, // TODO: điền diện tích thật
    ratio: 5, // TODO: điền tỷ lệ thật
    priceFrom: 5.2, // TODO: điền giá thật
    priceTo: 5.8,
    points:
      "105.97,1060.5 105.97,1682.17 112.03,1755.3 136.25,1822.35 214.97,1865.01 408.76,1871.11 1516.94,1865.01 1522.99,1054.4",
  },
];

export const PALM_RIVER_BUILDINGS = [
  // ==========================================================
  // THÁP 4
  // ==========================================================
  {
    id: "toa-4",
    name: "Tháp 4",

    d: "M1025 335 L1070 335 L1070 375 L1025 375 Z",

    mapPosition: {
      x: 337,
      y: 241,
      width: 52,
      height: 39,
    },

    rotation: 27,

    floorImage: floorToa4,

    apartmentTypes: TOWER_4_APARTMENT_TYPES,

    viewBox: {
      width: TOWER_IMAGE_WIDTH,
      height: TOWER_IMAGE_HEIGHT,
    },

    zones: TOWER_4_ZONES,

    matBangProps: {},
  },

  // ==========================================================
  // THÁP 3
  // ==========================================================
  {
    id: "toa-3",
    name: "Tháp 3",

    d: "M1080 335 L1125 335 L1125 375 L1080 375 Z",

    mapPosition: {
      x: 385,
      y: 280,
      width: 40,
      height: 38,
    },

    rotation: 64,

    floorImage: floorToa3,

    apartmentTypes: TOWER_3_APARTMENT_TYPES,

    viewBox: {
      width: TOWER_IMAGE_WIDTH,
      height: TOWER_IMAGE_HEIGHT,
    },

    zones: TOWER_ZONES("thap-3", [
      "2pn-goc",
      "2pn-goc-2",
      "2pn-goc-120m",
      "2pn",
      "3pn",
      "3pn-goc",
    ]),

    matBangProps: {},
  },

  // ==========================================================
  // TÒA C
  // ==========================================================
  {
    id: "toa-c",
    name: "Tòa C",

    d: "M1025 385 L1070 385 L1070 425 L1025 425 Z",

    mapPosition: {
      x: 435,
      y: 320,
      width: 47,
      height: 23,
    },

    rotation: -2,

    floorImage: null,

    viewBox: {
      width: 1200,
      height: 1200,
    },

    zones: [
      {
        id: "toa-c-01",
        code: "Căn C-01",
        typeId: "3pn-db",
        area: 108,
        ratio: 5,
        priceFrom: 5.2,
        priceTo: 5.8,
        points: "80,80 260,80 260,240 80,240",
      },

      {
        id: "toa-c-02",
        code: "Căn C-02",
        typeId: "2pn-db",
        area: 74,
        ratio: 6,
        priceFrom: 3.4,
        priceTo: 3.7,
        points: "280,80 500,80 500,260 280,260",
      },
    ],

    matBangProps: {},
  },

  // ==========================================================
  // TÒA D
  // ==========================================================
  {
    id: "toa-d",
    name: "Tòa D",

    d: "M1080 385 L1125 385 L1125 425 L1080 425 Z",

    mapPosition: {
      x: 495,
      y: 297,
      width: 22,
      height: 29,
    },

    rotation: 90,

    floorImage: null,

    viewBox: {
      width: 1200,
      height: 1200,
    },

    zones: [
      {
        id: "toa-d-01",
        code: "Căn D-01",
        typeId: "2pn",
        area: 60,
        ratio: 14,
        priceFrom: 2.7,
        priceTo: 3.0,
        points: "80,80 260,80 260,240 80,240",
      },

      {
        id: "toa-d-02",
        code: "Căn D-02",
        typeId: "3pn",
        area: 88,
        ratio: 11,
        priceFrom: 3.7,
        priceTo: 4.0,
        points: "280,80 500,80 500,260 280,260",
      },
    ],

    matBangProps: {},
  },
];

// id của vùng "PALM RIVER" trong AREAS (TienIchData.js)
// — khớp field `id` của area có popup.title bắt đầu "PALM RIVER".
export const PALM_RIVER_AREA_ID = "3";
