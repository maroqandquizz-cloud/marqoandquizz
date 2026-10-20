// Katta fayllar (>4.5 MB) uchun brauzerdan Vercel Blob'ga to'g'ridan-to'g'ri yuklash tokenini beradi.
import { same, send, jbody } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method' });
  try {
    const body = jbody(req);
    const { handleUpload } = await import('@vercel/blob/client');
    const out = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!process.env.ADMIN_PASSWORD || !same(clientPayload || '', process.env.ADMIN_PASSWORD)) throw new Error('Ruxsat yo‘q');
        if (!/^media\/[a-z0-9]{6,40}$/i.test(pathname)) throw new Error('Noto‘g‘ri fayl yo‘li');
        return {
          allowedContentTypes: ['image/*', 'audio/*', 'video/*'],
          maximumSizeInBytes: 300 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    send(res, 200, out);
  } catch (e) {
    send(res, 400, { error: String((e && e.message) || e) });
  }
}
