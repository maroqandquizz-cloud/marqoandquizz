// Mahalliy sinov serveri: public/ + api/* (haqiqiy handlerlar), Upstash Redis xotirada taqlid qilinadi.
// Ishga tushirish: npm run dev:cloud  →  http://localhost:3100  (parol: test1234)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json' };

export function installFakeRedis() {
  const db = new Map(), real = globalThis.fetch;
  globalThis.fetch = async (u, o) => {
    if (!String(u).startsWith('https://fake-redis.local')) return real(u, o);
    const [op, ...a] = JSON.parse(o.body); let r = null;
    if (op === 'GET') r = db.has(a[0]) ? db.get(a[0]) : null;
    else if (op === 'SET') { db.set(a[0], a[1]); r = 'OK'; }
    else if (op === 'DEL') { r = 0; for (const k of a) if (db.delete(k)) r++; }
    else if (op === 'EVAL') {
      const [, , k1, k2, rev, val, chk] = a;
      if (chk === '1' && (+db.get(k2) || 0) !== +rev) r = -1;
      else { db.set(k1, val); r = (+db.get(k2) || 0) + 1; db.set(k2, String(r)); }
    }
    return new Response(JSON.stringify({ result: r }), { status: 200 });
  };
  return db;
}

export function setEnv() {
  process.env.ADMIN_PASSWORD ||= 'test1234';
  process.env.KV_REST_API_URL ||= 'https://fake-redis.local';
  process.env.KV_REST_API_TOKEN ||= 'tok';
  process.env.BLOB_READ_WRITE_TOKEN ||= 'vercel_blob_rw_teststore123_secret';
}

export function makeServer() {
  return http.createServer(async (req, res) => {
    const u = new URL(req.url, 'http://x');
    if (u.pathname.startsWith('/api/')) {
      const name = u.pathname.slice(5).replace(/[^a-z]/g, '');
      let raw = ''; for await (const c of req) raw += c;
      req.query = Object.fromEntries(u.searchParams);
      req.body = /json/.test(req.headers['content-type'] || '') && raw ? JSON.parse(raw) : raw;
      res.status = (c) => { res.statusCode = c; return res; };
      res.json = (o) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); };
      try {
        const m = await import(pathToFileURL(path.join(ROOT, 'api', name + '.js')).href);
        return await m.default(req, res);
      } catch (e) { res.statusCode = 404; return res.end('no api'); }
    }
    let f = path.join(ROOT, 'public', u.pathname === '/' ? 'index.html' : u.pathname);
    if (!f.startsWith(path.join(ROOT, 'public')) || !fs.existsSync(f)) { res.statusCode = 404; return res.end('not found'); }
    res.setHeader('content-type', MIME[path.extname(f)] || 'application/octet-stream');
    res.end(fs.readFileSync(f));
  });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  setEnv(); installFakeRedis();
  const port = +process.env.PORT || 3100;
  makeServer().listen(port, () => console.log('Sinov serveri: http://localhost:' + port + '  (parol: ' + process.env.ADMIN_PASSWORD + ')'));
}
