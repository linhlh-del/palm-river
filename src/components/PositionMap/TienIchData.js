// ============================================================
// 4 VÙNG HOTSPOT TRÊN SVG (area-map)
// path lấy nguyên từ SVG gốc, filterId dùng để nối tới <filter> tương ứng trong defs
// ============================================================
export const AREAS = [
  {
    id: "3",
    filterId: "filter0_if_917_3001",
    d: "M488.5 374.5C505 377.5 505.369 384.54 508.5 379C511.18 374.258 523.115 350.741 528 335C534.963 312.565 536.171 296.645 530 294C512.26 286.397 487 275 480 271.5C473 268 412.5 240 387.5 236.5C362.5 233 333.5 239.5 323 240C312.5 240.5 306 248 307 254.5C308.301 262.959 373.735 353.106 389 362.5C408.5 374.5 472 371.5 488.5 374.5Z",
    popup: {
      title: "PALM RIVER\nHỆ TIỆN ÍCH THỦY DƯỠNG",
      count: 16,
    },
  },
  {
    id: "2",
    filterId: "filter1_if_917_3001",
    d: "M908.5 556.001L769 598.499C762 599.999 750.3 597.5 739.5 593.5C726 588.5 713 567 694.5 549.5C677.114 533.053 619.098 496.735 612.177 492.422C611.723 492.139 611.338 491.779 611.106 491.296C609.947 488.888 607.464 480.574 621.5 470.5C640.667 456.743 686.487 470.884 693.573 473.192C694.204 473.398 694.72 473.739 695.183 474.215C699.996 479.153 729.812 508.183 771 513.999C813.5 520.001 851 514.998 869 510.999C886.908 507.022 945 485.5 952 486C959 486.5 989 511.001 991.5 520.001C993.5 527.201 987 531.668 983.5 533.001L908.5 556.001Z",
    popup: {
      title: "TÒA THÁP BIỂU TƯỢNG",
      count: 16,
    },
  },
  {
    id: "1",
    filterId: "filter2_if_917_3001",
    d: "M1020 400.5L1036 361.5C1039.83 352 1043.84 337.322 1048.5 332C1051.7 328.338 1056.03 328.028 1058.01 328.002C1058.34 327.998 1058.65 328.037 1058.96 328.115C1085.96 334.826 1140.64 348.614 1147 351C1153.4 353.4 1155.33 360 1155.5 363C1154.33 379.667 1152 414.3 1152 419.5C1152 426 1136.5 431 1130.5 434C1125.7 436.4 1120.5 435.667 1118.5 435C1086.83 427.333 1022.8 411.5 1020 409.5C1017.2 407.5 1018.83 402.667 1020 400.5Z",
    popup: {
      title: "HỆ TIỆN ÍCH\nNHIỆT DƯỠNG",
      count: 40,
    },
  },
  {
    id: "4",
    filterId: "filter3_if_917_3001",
    d: "M300 257.999C318.077 283.504 344.991 321.969 353.102 333.57C354.411 335.442 353.882 338.018 351.949 339.235L275.542 387.343C274.863 387.77 274.071 387.984 273.269 387.955L193.858 385.136C191.706 385.06 190.027 383.312 190.204 381.165C191.139 369.84 196.358 335.246 225.5 301.999C245.947 276.247 282.578 256.71 285 255.499C292 252 298.167 255.666 300 257.999Z",
    popup: {
      title: "HỆ SINH THÁI\nVƯỜN DƯỠNG SINH",
      count: 8,
    },
  },
];

// ============================================================
// 40 ĐIỂM GHIM (point-element) chia theo 5 nhóm — đúng theo bảng bên phải
// ⚠️ POSITION: chỉ có toạ độ điểm #1 từ CSS gốc (top:66%, left:43%).
// 39 điểm còn lại đang để placeholder {top:null, left:null} — cần bạn
// cung cấp full block CSS `.point-element:nth-of-type(n){top;left}` gốc,
// mình sẽ generate lại POSITIONS chuẩn 100%.
// ============================================================
export const AMENITY_GROUPS = [
  {
    title: "TUYẾN THƯƠNG MẠI",
    items: [
      { id: 1, name: "Cổng chào biểu tượng" },
      { id: 2, name: "Dãy cửa hàng thương mại (Shophouse)" },
      { id: 3, name: "Khu cà phê ngoài trời / Sân ăn uống" },
    ],
  },
  {
    title: "CÔNG VIÊN CỘNG ĐỒNG",
    items: [
      { id: 4, name: "Không gian thư giãn" },
      { id: 5, name: "Vườn thảo mộc cộng đồng" },
      { id: 6, name: "Thảm cỏ sinh hoạt cộng đồng" },
      { id: 7, name: "Khán đài cỏ" },
      { id: 8, name: "Góc võng thư giãn" },
    ],
  },
  {
    title: "KHU THỂ THAO & CHĂM SÓC SỨC KHỎE",
    items: [
      { id: 9, name: "Sân Pickleball" },
      { id: 10, name: "Sân bóng chuyền" },
      { id: 11, name: "Sân thể thao đa năng" },
      { id: 12, name: "Bàn bóng bàn" },
      { id: 13, name: "Khu chơi Bocce" },
      { id: 14, name: "Nhà vệ sinh" },
    ],
  },
  {
    title: "CÔNG VIÊN SINH THÁI VEN SÔNG",
    items: [
      { id: 15, name: "Cổng chào biểu tượng" },
      { id: 16, name: "Khu vui chơi chào đón" },
      { id: 17, name: "Không gian thư giãn" },
      { id: 18, name: "Điểm ngắm cảnh ven sông" },
      { id: 19, name: "Ghế ngồi thư giãn" },
      { id: 20, name: "Lối vào & bãi đỗ xe đạp" },
      { id: 21, name: "Thảm cỏ đa năng" },
      { id: 22, name: "Chòi nghỉ gia đình" },
      { id: 23, name: "Khu vui chơi thiên nhiên" },
      { id: 24, name: "Đồng cỏ picnic & vườn cây ăn trái" },
      { id: 25, name: "Công viên thú cưng" },
      { id: 26, name: "Khu hóa vàng" },
      { id: 27, name: "Quảng trường trung tâm" },
      { id: 28, name: "Đường dạo trải nghiệm giác quan" },
      { id: 29, name: "Khu vận động người cao tuổi" },
      { id: 30, name: "Sàn thư giãn & chăm sóc sức khỏe" },
      { id: 31, name: "Đài quan sát sinh thái" },
      { id: 32, name: "Khu rừng tĩnh tại" },
      { id: 33, name: "Điểm câu cá" },
      { id: 34, name: "Tác phẩm nghệ thuật cảnh quan" },
      { id: 35, name: "Đường chạy bộ ven sông" },
      { id: 36, name: "Làn đường dành cho xe đạp" },
    ],
  },
  {
    title: "KHU KHÁC",
    items: [
      { id: 37, name: "Trường học quốc tế Mỹ" },
      { id: 38, name: "Bệnh viện quốc tế" },
      { id: 39, name: "Tòa tháp biểu tượng và Văn phòng A+" },
      { id: 40, name: "Bãi giữ xe công cộng" },
    ],
  },
];

// Toạ độ % (top/left) của từng điểm trên ảnh nền, key = id (1-40)
// TODO: điền nốt 39 điểm còn lại. Điểm 1 lấy đúng theo CSS gốc.
export const POINT_POSITIONS = {
  1: { top: "66%", left: "43%" },
  2: { top: "56%", left: "38%" },
  3: { top: "38%", left: "28%" },
  4: { top: "42%", left: "19%" },
  5: { top: "43%", left: "23%" },
  6: { top: "41%", left: "22%" },
  7: { top: "39%", left: "20%" },
  8: { top: "42%", left: "17%" },
  9: { top: "47%", left: "39%" },
  10: { top: "50%", left: "40%" },
  11: { top: "50%", left: "38%" },
  12: { top: "43%", left: "40%" },
  13: { top: "45.8%", left: "40.5%" },
  14: { top: "52.5%", left: "39%" },
  15: { top: "56%", left: "60.5%" },
  16: { top: "53%", left: "54%" },
  17: { top: "53%", left: "52%" },
  18: { top: "52%", left: "50%" },
  19: { top: "52%", left: "56%" },
  20: { top: "55%", left: "54%" },
  21: { top: "52%", left: "48.5%" },
  22: { top: "49%", left: "45%" },
  23: { top: "51%", left: "46.5%" },
  24: { top: "37%", left: "39%" },
  25: { top: "31.5%", left: "32.5%" },
  26: { top: "24.6%", left: "23%" },
  27: { top: "25%", left: "18%" },
  28: { top: "32%", left: "13%" },
  29: { top: "28%", left: "15%" },
  30: { top: "36%", left: "11.5%" },
  31: { top: "41%", left: "10.5%" },
  32: { top: "66%", left: "9.75%" },
  33: { top: "73%", left: "9.75%" },
  34: { top: "76%", left: "10.75%" },
  35: { top: "54.5%", left: "9.95%" },
  36: { top: "60%", left: "9.85%" },
  37: { top: "69%", left: "15%" },
  38: { top: "65%", left: "38%" },
  39: { top: "63%", left: "44.5%" },
  40: { top: "58%", left: "54.5%" },
  // 3: { top: "__%", left: "__%" },
  // ... điền tiếp tới 40
};

// Danh sách phẳng tất cả điểm, kèm toạ độ (fallback 50%/50% nếu chưa có data)
export const POINTS = AMENITY_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.title,
    top: POINT_POSITIONS[item.id]?.top ?? "50%",
    left: POINT_POSITIONS[item.id]?.left ?? "50%",
  })),
);
