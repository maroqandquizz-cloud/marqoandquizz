import { same, send, jbody } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method' });
  if (!process.env.ADMIN_PASSWORD) return send(res, 500, { error: 'ADMIN_PASSWORD sozlanmagan' });
  let key = '';
  try { key = String(jbody(req).key || ''); } catch {}
  if (same(key, process.env.ADMIN_PASSWORD)) return send(res, 200, { ok: true });
  await new Promise((r) => setTimeout(r, 400)); // parol terishni sekinlashtirish
  send(res, 401, { error: 'auth' });
}
