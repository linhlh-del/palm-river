import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCmsEnv } from './load-cms-env.mjs';
import { buildCmsSchema } from '../src/cms/schema.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
loadCmsEnv(root);
const out = join(root, 'public/cms-schema.json');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(buildCmsSchema(basename(root), process.env.VITE_LEAD_WEBHOOK_URL || ''), null, 2) + '\n');
console.log(`[cms] Schema: ${out}`);
