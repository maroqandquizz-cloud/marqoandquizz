// Media ro'yxati va o'chirish (Vercel Blob). Yuklash — api/upload.js orqali brauzerdan to'g'ridan-to'g'ri.
import { authed, send } from './_lib.js';

export default async function handler(req, res) {
  if (!authed(req)) return send(res, 401, { error: 'auth' });
  try {
    const { list, del } = await import('@vercel/blob');
    if (req.method === 'GET') {
      const items = []; let cursor;
      do {
        const r = await list({ prefix: 'media/', cursor, limit: 1000 });
        items.push(...r.blobs.map((b) => ({ id: b.pathname.slice(6), url: b.url, size: b.size })));
        cursor = r.hasMore ? r.cursor : undefined;
      } while (cursor);
      return send(res, 200, { items });
    }
    if (req.method === 'DELETE') {
      if (req.query.all) {
        let cursor;
        do {
          const r = await list({ prefix: 'media/', cursor, limit: 1000 });
          if (r.blobs.length) await del(r.blobs.map((b) => b.url));
          cursor = r.hasMore ? r.cursor : undefined;
        } while (cursor);
        return send(res, 200, { ok: true });
      }
      const id = String(req.query.id || '');
      if (!/^[a-z0-9]{6,40}$/i.test(id)) return send(res, 400, { error: 'id' });
      const r = await list({ prefix: 'media/' + id, limit: 5 });
      const urls = r.blobs.filter((b) => b.pathname === 'media/' + id).map((b) => b.url);
      if (urls.length) await del(urls);
      return send(res, 200, { ok: true });
    }
    send(res, 405, { error: 'method' });
  } catch (e) {
    send(res, 500, { error: String((e && e.message) || e) });
  }
}
