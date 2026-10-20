// Asosiy ma'lumotlar (mavzu/raund/savollar) — Upstash Redis'da. `rev` — bir vaqtda o'zgartirishdan himoya.
import { authed, redis, send, jbody } from './_lib.js';

const KEYS = ['state', 'backup-v1'];
const LUA = `
if ARGV[3]=='1' then
  local cur=tonumber(redis.call('GET',KEYS[2]) or '0')
  if cur~=tonumber(ARGV[1]) then return -1 end
end
redis.call('SET',KEYS[1],ARGV[2])
return redis.call('INCR',KEYS[2])`;

export default async function handler(req, res) {
  if (!authed(req)) return send(res, 401, { error: 'auth' });
  const k = String(req.query.k || '');
  if (!KEYS.includes(k)) return send(res, 400, { error: 'key' });
  const K = 'maroq:' + k, R = K + ':rev';
  try {
    if (req.method === 'GET') {
      const [v, rev] = await Promise.all([redis(['GET', K]), redis(['GET', R])]);
      return send(res, 200, { v: v == null ? null : JSON.parse(v), rev: +rev || 0 });
    }
    if (req.method === 'PUT') {
      const body = jbody(req);
      if (body.v === undefined) return send(res, 400, { error: 'v' });
      const r = await redis(['EVAL', LUA, 2, K, R, String(req.query.rev ?? '0'), JSON.stringify(body.v), k === 'state' ? '1' : '0']);
      if (r === -1) return send(res, 409, { error: 'conflict' });
      return send(res, 200, { rev: r });
    }
    if (req.method === 'DELETE') {
      await redis(['DEL', K, R]);
      return send(res, 200, { ok: true });
    }
    send(res, 405, { error: 'method' });
  } catch (e) {
    send(res, 500, { error: String((e && e.message) || e) });
  }
}
