import { COPY } from './copy.js';

const section = (id, label, keys, images = [], locked = false) => ({
  id, label, locked, inLayout: true,
  fields: keys.map((key) => ({ key, label: key.split('.').slice(1).join(' · '), default: COPY[key], type: COPY[key]?.length > 100 ? 'textarea' : 'text' })),
  images,
});

export const HOME_SECTIONS = [
  section('hero', 'Ảnh mở đầu', [], [{ key: 'hero.image', label: 'Ảnh hero', default: '/cms-default/hero.webp', ratio: '16/9' }], true),
  section('tong-quan', 'Tổng quan', ['overview.kicker', 'overview.title', 'overview.description1', 'overview.description2', 'overview.tableTitle'], [{ key: 'overview.image', label: 'Ảnh tổng quan', default: '/cms-default/overview.jpg', ratio: '4/3' }]),
  section('vi-tri', 'Vị trí', ['location.title1', 'location.title2', 'location.description']),
  section('mat-bang-tong-the', 'Mặt bằng tổng thể', ['masterplan.kicker', 'masterplan.title', 'masterplan.description'], [{ key: 'masterplan.image', label: 'Ảnh mặt bằng tổng thể', default: '/cms-default/masterplan.jpg', ratio: '16/9' }]),
  section('mat-bang-tang', 'Mặt bằng tầng', []),
  section('tien-ich', 'Tiện ích', ['amenities.title', 'amenities.subtitle'], [{ key: 'amenities.map', label: 'Ảnh sơ đồ tiện ích', default: '/cms-default/amenities-map.png', ratio: '3360/1800', hint: 'Ảnh thay phải cùng bố cục và tỉ lệ 3360×1800; các tọa độ zone/nhãn đang cố định theo ảnh gốc.' }]),
  section('hinh-anh', 'Thư viện tiện ích', ['gallery.title', 'gallery.description']),
  section('tin-tuc', 'Tin tức', ['news.title', 'news.description']),
  section('lien-he', 'Form đăng ký', ['lead.title'], [], true),
];

export function buildCmsSchema(project, leadEndpoint = '') {
  return {
    version: 1, project, langs: ['vi'], sections: [...HOME_SECTIONS, { ...section('footer', 'Chân trang', ['footer.title', 'footer.highlight', 'footer.suffix']), inLayout: false }],
    seo: [
      { path: '/', label: 'Trang chủ', default: { title: 'Palm River - Căn Hộ Cao Cấp Ven Sông Palm City | Nam Rạch Chiếc, TP. Thủ Đức', description: 'Palm River - căn hộ cao tầng hạng sang 1,9ha trong khu đô thị Palm City 30,2ha, mặt tiền cao tốc TP.HCM - Long Thành - Dầu Giây, TP. Thủ Đức. Liền kề The Global City, ba mặt giáp sông, bờ sông dài 2,7km. Chủ đầu tư Hướng Việt Properties.' }, defaultOgImage: '/images/logo/thumbnail.jpg' },
      { path: '/tin-tuc', label: 'Tin tức', default: { title: COPY['news.title'] + ' | Palm River', description: COPY['news.description'] }, defaultOgImage: '/images/logo/thumbnail.jpg' },
    ],
    settings: [
      { key: 'site.contact.hotline', label: 'Hotline hiển thị', default: '0877 191 940' },
      { key: 'site.contact.hotlineHref', label: 'Liên kết gọi (tel:)', default: 'tel:0877191940' },
      { key: 'site.contact.zaloUrl', label: 'Liên kết Zalo', default: 'https://zalo.me/1717736678695240623' },
    ],
    lead: { defaultEndpoint: leadEndpoint },
  };
}
