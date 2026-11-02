const files = import.meta.glob('../generated/cms-content.json', { eager: true, import: 'default' });
const published = Object.values(files)[0] || {};

export const cmsText = (key, fallback) => {
  const value = published.texts?.[key];
  const text = typeof value === 'string' ? value : value?.vi;
  return typeof text === 'string' && text.trim() ? text : fallback;
};

export const cmsImage = (key, fallback) => published.images?.[key]?.src || fallback;
export const cmsLayout = published.layout || {};
export const cmsSeo = (path) => published.seo?.[path] || {};
export const cmsHead = published.head || {};
export const cmsSetting = (key, fallback) => published.settings?.[key] || fallback;
export const cmsLeadEndpoint = published.lead?.endpoint || '';

export function orderSections(sections) {
  const order = cmsLayout.order || [];
  const hidden = new Set(cmsLayout.hidden || []);
  return sections.filter((section) => section.locked || !hidden.has(section.id))
    .sort((a, b) => {
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      return (ai < 0 ? sections.indexOf(a) : ai) - (bi < 0 ? sections.indexOf(b) : bi);
    });
}
