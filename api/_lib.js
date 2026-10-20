// Umumiy yordamchilar: parol tekshiruvi, Upstash Redis (REST) va javob yuborish.
import { timingSafeEqual, createHash } from 'node:crypto';

const RURL = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const RTOK = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const missing = () => {
  const m = [];
  if (!process.env.ADMIN_PASSWORD) m.push('ADMIN_PASSWORD');
  if (!RURL() || !RTOK()) m.push('Upstash Redis (KV_REST_API_URL, KV_REST_API_TOKEN)');
  if (!process.env.BLOB_READ_WRITE_TOKEN) m.push('Vercel Blob (BLOB_READ_WRITE_TOKEN)');
  return m;
};

const sha = (s) => createHash('sha256').update(String(s)).digest();
export const same = (a, b) => timingSafeEqual(sha(a), sha(b));
export const authed = (req) => !!process.env.ADMIN_PASSWORD && same(req.headers['x-key'] || '', process.env.ADMIN_PASSWORD);
export const jbody = (req) => (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {});

export async function redis(cmd) {
  const r = await fetch(RURL(), {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + RTOK(), 'content-type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || 'redis ' + r.status);
  return j.result;
}

export const send = (res, code, obj) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(code).json(obj);
};

// Blob URL manzili tokendan olinadi: https://<storeId>.public.blob.vercel-storage.com
export const mediaBase = () => {
  const m = (process.env.BLOB_READ_WRITE_TOKEN || '').match(/^vercel_blob_rw_([a-z0-9]+)_/i);
  return m ? `https://${m[1].toLowerCase()}.public.blob.vercel-storage.com` : '';
};
