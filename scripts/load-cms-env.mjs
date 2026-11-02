import { loadEnv } from 'vite';

export function loadCmsEnv(root) {
  for (const [key, value] of Object.entries(loadEnv('production', root, ''))) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
