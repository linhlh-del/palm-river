import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCmsEnv } from './load-cms-env.mjs';
import { buildCmsSchema } from '../src/cms/schema.js';
import { cleanHead, headHtml } from './cms-head.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
loadCmsEnv(root);
const dist = join(root, 'dist');
const contentFile = join(root, 'src/generated/cms-content.json');
const cms = existsSync(contentFile) ? JSON.parse(readFileSync(contentFile, 'utf8')) : {};
const schema = buildCmsSchema('palm-river-mkt');
const original = readFileSync(join(dist, 'index.html'), 'utf8');
const siteUrl = (process.env.CMS_SITE_URL || original.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] || '').replace(/\/$/, '');
const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function meta(html, attr, key, value) {
  if (!value) return html;
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attr}=["']${key}["'])[^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n  </head>`);
}

function applyHead(html) {
  const head = cleanHead(cms.head || {});
  const present = [
    ['gtmId', /GTM-[A-Z0-9]{4,10}/g],
    ['ga4Id', /G-[A-Z0-9]{4,12}/g],
    ['googleAdsId', /AW-\d{6,12}/g],
  ];
  for (const [key, pattern] of present) {
    if (head[key] && pattern.test(html)) {
      html = html.replace(pattern, head[key]);
      delete head[key]; // thẻ sẵn có đã được cập nhật; tránh tải 2 lần
    }
  }
  for (const [key, name] of [['googleVerification', 'google-site-verification'], ['facebookVerification', 'facebook-domain-verification'], ['zaloVerification', 'zalo-platform-site-verification'], ['bingVerification', 'msvalidate.01']]) {
    if (head[key]) {
      const pattern = new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name.replace('.', '\\.')}["'])[^>]*>`, 'gi');
      html = html.replace(pattern, '');
    }
  }
  const tags = headHtml(head, { gtm: true });
  if (tags.head) html = html.replace('</head>', `  ${tags.head}\n</head>`);
  if (tags.bodyStart) html = html.replace(/<body([^>]*)>/, `<body$1>\n  ${tags.bodyStart}`);
  return html;
}

function render(path) {
  let html = applyHead(original);
  const spec = schema.seo.find((item) => item.path === path);
  const override = cms.seo?.[path] || {};
  const values = path === '/' ? (override.vi || override) : { ...spec?.default, ...(override.vi || override) };
  if (values.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(values.title)}</title>`);
    html = meta(html, 'property', 'og:title', values.title);
    html = meta(html, 'name', 'twitter:title', values.title);
  }
  if (values.description) {
    html = meta(html, 'name', 'description', values.description);
    html = meta(html, 'property', 'og:description', values.description);
    html = meta(html, 'name', 'twitter:description', values.description);
  }
  const image = override.ogImage?.src;
  if (image) {
    const url = image.startsWith('/') ? siteUrl + image : image;
    html = meta(html, 'property', 'og:image', url);
    html = meta(html, 'property', 'og:image:secure_url', url);
    html = meta(html, 'name', 'twitter:image', url);
  }
  if (siteUrl) {
    const url = siteUrl + (path === '/' ? '/' : path);
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]+"\s*\/>/i, `<link rel="canonical" href="${esc(url)}" />`);
    html = meta(html, 'property', 'og:url', url);
    html = meta(html, 'name', 'twitter:url', url);
  }
  return html;
}

writeFileSync(join(dist, 'index.html'), render('/'));
const newsDir = join(dist, 'tin-tuc');
mkdirSync(newsDir, { recursive: true });
writeFileSync(join(newsDir, 'index.html'), render('/tin-tuc'));
console.log('[cms] Đã cập nhật SEO, tracking và trang /tin-tuc trong dist.');
