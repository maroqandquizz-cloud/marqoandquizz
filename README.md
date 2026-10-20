# MaroqAndQuiz — Vercel (bulut ma'lumotlar bazasi bilan)

Ma'lumotlar endi brauzer xotirasida emas, **Vercel bazasida** saqlanadi: istalgan qurilmadan (telefon, boshqa kompyuter) parol bilan kirsangiz, bir xil mavzu, raund, savol va fayllarni ko'rasiz.

| Nima | Qayerda saqlanadi |
|---|---|
| Mavzular, raundlar, savollar, jamoalar, dizayn sozlamalari | **Upstash Redis** (Vercel Marketplace) |
| Rasm, audio, video, logotiplar | **Vercel Blob** (Public store) |
| Kirish paroli | Vercel **ADMIN_PASSWORD** o'zgaruvchisi (server tekshiradi) |

## Sozlash (bir marta, ~10 daqiqa)

1. **Loyihani Vercel'ga yuklang** (GitHub'ga push qiling va Vercel'da *Add New → Project* orqali ulang, yoki `vercel` CLI). Build sozlamalari `vercel.json` da tayyor.
2. **Redis qo'shing:** Vercel → loyiha → **Storage** → *Create Database* → **Upstash for Redis** (Marketplace) → yarating va loyihaga **Connect** qiling. `KV_REST_API_URL` va `KV_REST_API_TOKEN` avtomatik qo'shiladi.
3. **Blob qo'shing:** xuddi shu yerda **Storage → Create → Blob**. Store turini **Public** tanlang (Private emas) va loyihaga ulang. `BLOB_READ_WRITE_TOKEN` avtomatik qo'shiladi.
4. **Parol belgilang:** **Settings → Environment Variables** → `ADMIN_PASSWORD` nomi bilan o'zingiz o'ylab topgan kuchli parolni yozing (Production va Preview ga).
5. **Qayta deploy qiling** (Deployments → ⋯ → Redeploy). O'zgaruvchilar faqat yangi deploydan keyin ishlaydi.
6. Saytni oching → parol so'raydi → kiring. Sozlamalar bo'limida "☁ Ma'lumotlar Vercel bazasida saqlanmoqda" yozuvi chiqsa, hammasi to'g'ri.

Agar parol oynasida "Serverda sozlanmagan: …" chiqsa, aytilgan qadam bajarilmagan (yoki qayta deploy qilinmagan).

## Eski ma'lumotlarni ko'chirish

- Agar eski versiya shu **bir xil domenda** ishlagan bo'lsa: yangi saytga kiring → **Sozlamalar → "Eski mahalliy ma'lumotlarni bulutga ko'chirish"** (shu brauzerdagi eski ma'lumotlarni va fayllarni yuklaydi).
- Boshqa domen/brauzerdan bo'lsa: eski versiyada **Zaxira nusxasini yuklab oling**, yangi saytda **Fayldan tiklash**.

## Muhim ma'lumotlar

- Parolni o'zgartirish: Vercel'da `ADMIN_PASSWORD` ni yangilab, qayta deploy qiling.
- Ikki qurilmada bir vaqtda tahrirlashda ikkinchisi "boshqa qurilmada o'zgargan, sahifani yangilang" xabarini oladi (ma'lumot ustidan yozilmaydi).
- Namoyish (ikkinchi monitor) oynasi ham shu parol bilan ishlaydi; u asosiy oynadan ochilsa parolni qayta so'ramaydi.
- Fayllar Blob'dan ochiq havola orqali yuklanadi (havola taxmin qilib bo'lmaydigan ID dan iborat). Savol matnlari esa faqat parol bilan olinadi.
- Server sozlanmagan bo'lsa yoki sayt `file://` / `npm start` bilan ochilsa, dastur **mahalliy rejim**da (brauzer xotirasida) ishlaydi va Sozlamalarda ogohlantiradi.

## Mahalliy ishlash

- `npm run build` — tekshiruv; `npm test` — avtomatik testlar (API ham).
- `npm run dev:cloud` — API'ni soxta Redis bilan mahalliy ishga tushiradi: http://localhost:3100 (parol `test1234`; Blob yuklash bu rejimda ishlamaydi).
- `node tests/e2e-cloud.mjs` — ixtiyoriy brauzer testi (Playwright kerak).

## Tuzilma

`public/index.html` — butun ilova · `api/` — Vercel funksiyalari (`kv`, `media`, `upload`, `login`, `ping`) · `tests/` — testlar.

## Cheklovlar

- Asosiy ma'lumot (matnlar) bitta yozuv sifatida saqlanadi: ~4 MB dan oshsa, saqlash xato beradi (rasm/audio/video bunga kirmaydi). Juda katta bazalar uchun mavzularni alohida yozuvlarga bo'lish kerak bo'ladi.
- Internet kerak (oflayn ishlamaydi). Fayl yuklash `esm.sh` orqali `@vercel/blob` mijoz kutubxonasini yuklaydi.
