// Ixtiyoriy brauzer testi (Playwright kerak): ikki qurilma, parol, bulutda saqlash, to'qnashuv.
// Avval: npm run dev:cloud  (boshqa oynada),  keyin: node tests/e2e-cloud.mjs
import { createRequire } from 'module';
const require = createRequire(process.env.NODE_PATH + '/'); const pw = require('playwright');
const U = 'http://localhost:' + (process.env.PORT || 3100) + '/', out = [], bad = [];
const chk = (c, m) => { out.push((c ? 'OK   ' : 'XATO ') + m); if (!c) bad.push(m); };
const b = await pw.chromium.launch();
async function dev(name) { const c = await b.newContext(), p = await c.newPage(); p.on('pageerror', (e) => bad.push(name + ' PAGEERR ' + e.message)); await p.goto(U); await p.waitForTimeout(500); return p; }
const body = (p) => p.innerText('body');
const login = async (p, k) => { await p.fill('#gpw', k); await p.click('[data-a=glogin]'); await p.waitForTimeout(900); };
const A = await dev('A');
chk((await body(A)).includes('Davom etish uchun parolni kiriting'), 'A: parol oynasi chiqdi');
await login(A, 'xato'); chk((await body(A)).includes('Parol noto‘g‘ri'), 'A: noto‘g‘ri parol rad etildi');
await login(A, 'test1234'); chk((await body(A)).includes('Bosh sahifa'), 'A: to‘g‘ri parol bilan kirildi');
await A.click('[data-v=rounds]'); await A.waitForTimeout(300); await A.click('[data-a=newq]'); await A.waitForTimeout(300);
await A.fill('#nt', 'Bulut mavzusi'); await A.click('[data-a=create]'); await A.waitForTimeout(700);
await A.click('[data-a=mkr][data-n="0"]'); await A.waitForTimeout(300);
for (let i = 0; i < 3; i++) await A.fill(`[data-f="tm|n|${i}"]`, 'Bulut jamoa ' + (i + 1));
await A.click('[data-a=save]'); await A.waitForTimeout(700); 
const Bp = await dev('B'); await login(Bp, 'test1234');
await Bp.click('[data-v=rounds]'); await Bp.waitForTimeout(500);
chk((await body(Bp)).includes('Bulut mavzusi'), 'B (boshqa qurilma): mavzu ko‘rindi');
await Bp.click('.card.list [data-a=open]'); await Bp.waitForTimeout(500);
chk((await body(Bp)).includes('Jamoalar ro‘yxati'), 'B: jamoalar raundi ko‘rindi');
await Bp.click('.card.list [data-a=play]'); await Bp.waitForTimeout(500); await Bp.keyboard.press('ArrowRight'); await Bp.waitForTimeout(600);
chk((await Bp.innerText('.stage')).includes('Bulut jamoa 1'), 'B: jamoa slaydi bulutdagi ma’lumotdan ijro etildi');
// to'qnashuv: A yangi mavzu qo'shadi, B (eski versiya) ham qo'shmoqchi
await Bp.click('[data-a=gexit]'); await Bp.waitForTimeout(300); await Bp.click('text=Ha'); await Bp.waitForTimeout(400);
await A.click('[data-v=rounds]'); await A.waitForTimeout(300); await A.click('[data-a=newq]'); await A.waitForTimeout(300);
await A.fill('#nt', 'A ikkinchi'); await A.click('[data-a=create]'); await A.waitForTimeout(700);
await Bp.click('[data-v=rounds]'); await Bp.waitForTimeout(300); await Bp.click('[data-a=newq]'); await Bp.waitForTimeout(300);
await Bp.fill('#nt', 'B ikkinchi'); await Bp.click('[data-a=create]'); await Bp.waitForTimeout(800);
chk((await body(Bp)).includes('boshqa qurilmada o‘zgargan'), 'B: bir vaqtda o‘zgartirish to‘qnashuvi aniqlandi (ma’lumot ustidan yozilmadi)');
await Bp.reload(); await Bp.waitForTimeout(700); await Bp.click('[data-v=rounds]'); await Bp.waitForTimeout(400);
const t = await body(Bp); chk(t.includes('A ikkinchi') && !t.includes('B ikkinchi'), 'B: yangilangach A o‘zgarishi bor, to‘qnashgan B yozuvi yo‘q');
await Bp.click('text=Sozlamalar'); await Bp.waitForTimeout(300); chk((await body(Bp)).includes('Vercel bazasida saqlanmoqda'), 'Sozlamalar: bulut holati ko‘rsatilgan');
chk(await Bp.evaluate(() => !document.body.innerText.includes('Joriy parol')), 'Sozlamalar: mahalliy parol kartasi yashirin');
console.log(out.join('\n')); console.log(bad.length ? 'MUAMMOLAR:\n' + bad.join('\n') : 'Hammasi o‘tdi'); await b.close(); process.exit(bad.length ? 1 : 0);
