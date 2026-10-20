# MaroqAndQuiz — yakuniy tekshiruv hisoboti

## Loyiha turi
Bitta fayldan iborat statik sayt (vanilla JavaScript, IndexedDB). React, TypeScript, ESLint, backend va tashqi servislar **yo'q**,
shuning uchun lint/TypeScript tekshiruvi va dependency o'rnatish bosqichlari qo'llanilmadi.

## O'tkazilgan tekshiruvlar (`npm test`, 7 ta to'plam — hammasi muvaffaqiyatli)
| To'plam | Nimani tekshiradi |
|---|---|
| O'yin | 1–11-raundlarning har biri boshidan oxirigacha o'ynaladi; har bir holatda 125 soniya kutilib taymer o'zi boshlanmasligi, 0 da to'xtashi, avtomatik o'tish bo'lmasligi, bir vaqtda 1 tadan ortiq audio/interval bo'lmasligi; har raundga 500 ta tasodifiy bosish (qotib qolish, noto'g'ri holat); HTMLdagi teglar balansi; "undefined/NaN" yo'qligi; o'lik tugmalar yo'qligi |
| Admin | Mavzu yaratish; 11 raundni saqlash va tahrirlash oynasidagi barcha tugma/maydonlarni bosib chiqish; ma'lumotlar bazaga yozilishi |
| Yangilash | Sahifa qayta ochilganda barcha mavzu/raund/savollar tiklanishi; qayta ochilgandan keyin Ruletka o'ynalishi |
| Eski ma'lumot | Eski formatdagi 9 ta raundning mavzularga ko'chirilishi va zaxira nusxa saqlanishi |
| Parol/musiqa/zaxira | Parol o'rnatish, noto'g'ri parol, seans muddati, himoyalangan amallar; musiqa kutubxonasi (saqlash, tanlash, o'chirish, hajm cheklovi); zaxirani tiklash va noto'g'ri faylni rad etish |
| Ikki ekran | Boshlovchi holati ikkinchi ekranga uzatilganda ikkinchi ekran HTML'i boshlovchi HTML'i bilan 100% mos kelishi (1–11-raundlar, 100 dan ortiq holat) |
| Uzoq ishlash | 60 ta o'yin ketma-ket: kutilayotgan taymerlar soni va intervallar ko'payib ketmasligi |

Production build: `npm run build` — muvaffaqiyatli (skript sintaksisi, majburiy qismlar, maxfiy kalit yo'qligi).

## Topilgan va tuzatilgan muammolar
- Pauza/qayta boshlash taymersiz bosqichda musiqani tasodifan qayta boshlashi mumkin edi — faqat taymerli bosqichlarda ishlaydi.
- Fokusdagi tugma bilan Space/Enter bosilganda ikki amal birga bajarilishi mumkin edi; tugmani bosib ushlab turish bosqichlarni o'tkazib yuborishi mumkin edi — tuzatildi.
- Pastdagi boshqaruv tugmalari savol matnini to'sishi mumkin edi — ixchamlashtirildi, joy qoldirildi.
- Kutilmagan xatoda ekran qotib qolardi — endi "Xatolik yuz berdi" ekrani va tiklash tugmasi chiqadi; tugma bosish xatolari ushlanadi.
- Ikkinchi ekran media fayllarni har safar qayta yuklab, xotirani ko'paytirishi mumkin edi — takroriy yuklash olib tashlandi.
- Logotip hajmi 74 KB dan 11 KB ga kichraytirildi (yuklanish tezroq).
- "e'lon" so'zidagi noto'g'ri belgi to'g'rilandi.

## Tekshirilmagan / cheklovlar (yashirilmaydi)
- Haqiqiy brauzerda ko'rinish (dizayn, shriftlar, animatsiyalar, telefon va proyektor ekranlari) tekshirilmagan — testlar brauzersiz sun'iy muhitda bajarilgan.
- Haqiqiy audio/video ijrosi, ritm animatsiyasi, katta fayllar, sekin internet holati tekshirilmagan.
- Ikki ekranli namoyish mantig'i (holat uzatish va nusxa tekshiruvi) sinalgan, lekin haqiqiy ikki oyna/monitor o'rtasidagi ulanish, popup bloklash va video sinxronligi sinalmagan.
- Vercel'da haqiqiy deploy bajarilmagan (konfiguratsiya statik sayt uchun tayyorlangan, `npm run build` mahalliy o'tdi).
- Ma'lumotlar faqat brauzerda saqlanadi (qurilmalar o'rtasida ko'chmaydi, serverda zaxira yo'q). Parol himoyasi brauzer ichida.

## 2-bosqich: yangi qo'shilgan imkoniyatlar
- **Dizayn studiyasi** (yangi "Dizayn" bo'limi, parol bilan): 6 xil savol dizayni (Klassik, Neon, Oltin, Oq minimal, Rangli kartalar, Yuqori kontrast), shrift tanlash (8 ta), fon rasmi yuklash. Tanlov saqlanadi va ikkinchi ekranda ham qo'llanadi.
- **Boshlovchi paneli** (kompyuter + HDMI orqali ulangan ikkinchi monitor): ikkinchi ekran ulanganda boshlovchi oynasida chap yuqorida panel chiqadi: joriy holat, taymer, joriy savolning to'g'ri javobi va "Keyingi" slayd nomi. Panel faqat ikkinchi ekran ulangan bo'lsa ko'rinadi (javob auditoriyaga ko'rinmasligi uchun), **P** tugmasi bilan yashiriladi. "Namoyish ekrani" tugmasi brauzer ruxsat bersa (Chrome/Edge) oynani avtomatik ikkinchi monitorda ochadi; oynada bir marta bosilsa to'liq ekranga o'tadi.
- **Drag-and-drop**: savol kartasidagi ⠿ tutqichni sudrab savollar tartibi o'zgartiriladi (↑↓ tugmalari ham qoldi).

## Tekshiruv natijasi (2-bosqich)
`npm run build` va `npm test` (7 ta to'plam) — hammasi muvaffaqiyatli. Mavjud testlar yangi kod bilan regressiyasiz o'tdi (jumladan ikki ekran nusxa tekshiruvi va 60 o'yinli uzoq sinov).

## Cheklovlar (2-bosqich, yashirilmaydi)
- Yangi imkoniyatlar uchun alohida avtomatik test yozilmagan; ular haqiqiy brauzerda sinalmagan (dizaynlar ko'rinishi, shriftlar yuklanishi, sudrab tashlash, ikkinchi monitorni avtomatik topish).
- "Keyingi slayd preview" — matnli ko'rinish (nomi va savol matni), haqiqiy kichraytirilgan slayd rasmi emas.
- Ikkinchi monitorni avtomatik topish faqat Window Management API'ni qo'llaydigan brauzerlarda (Chrome/Edge) ishlaydi; boshqalarda oyna oddiy ochiladi va qo'lda ko'chiriladi.
- Fon rasmi zaxira nusxaga qo'shilishi sinalmagan. Shriftlar Google Fonts'dan yuklanadi (internet kerak).
- "Dizayn" tanlovi barcha raundlarga umumiy; har raund uchun alohida dizayn yo'q.

## 3-bosqich: tuzatishlar va yangi raund
- **Xato (dizayn):** 2–6-dizaynlar javoblar ochilayotganda "g'olib" (to'g'ri javob yorug'lanishi) va noto'g'ri variantlarning yo'qolish effektini bosib ketardi, shu sabab savol ko'rsatilgandan keyin javob bosqichi noto'g'ri ishlardi. Dizayn qoidalari endi shu holatlarga tegmaydi. Shuningdek, studiyadagi namuna kartalari endi har biri o'z dizaynida ko'rinadi (ilgari hammasi tanlangan dizaynda ko'rinardi).
- **Yangi raund — "Jamoalar ro'yxati"** (Mavzu ichida 1-raunddan oldin): jamoalar nomi, a'zolari/shiori va logotipi kiritiladi (boshlang'ich 10 ta qator, qo'shish/o'chirish/↑↓ bilan tartiblash mumkin). O'yinda har bir jamoa alohida ekranda ketma-ket tanishtiriladi ("JAMOA 3 / 10"), "Oldingi/Keyingi" tugmalari va ikkinchi ekran ishlaydi; boshlovchi panelida keyingi jamoa nomi ko'rinadi. Homiylar taqdimoti bu raunddan oldin emas, avvalgidek 1-raunddan oldin chiqadi.
- Testlar: yangi "Jamoalar ro'yxati raundi" to'plami qo'shildi (8 ta to'plam, hammasi muvaffaqiyatli). Mavzu kartasida endi "k/12 raund tayyor" yoziladi.
- Cheklov: dizayn ko'rinishi va yangi raund haqiqiy brauzerda hali ko'rilmagan, testlar brauzersiz muhitda bajarildi.

## 4-bosqich: haqiqiy brauzerda (Chromium) sinov va tuzatishlar
- **Dizayn tanlash xatosi sababi topildi:** studiyadagi namuna kartalari to'liq ekranli qatlam (`position:fixed`) bo'lib chizilib, sahifani qoplab olgan edi — bosishlar kartalarga yetmasdi. Endi namunalar oddiy kichik blok. Haqiqiy brauzerda 6 ta dizaynning hammasi va shrift tanlash sinaldi, xatolik yo'q.
- **Jamoalar raundi "ijro etish" xatosi sababi topildi:** mavzu ro'yxatida "O'yinni boshlash" tugmasi faqat savoli bor, "Ruletka" yoki "Winners" raundlari uchun chiqardi. "Jamoalar ro'yxati" shartga qo'shildi. Haqiqiy brauzerda: yaratish → saqlash → boshlash → 10 ta jamoa ketma-ket → yakun → orqaga → "Ko'rib chiqish" tugmasi sinaldi, xatolik yo'q.
- Testlarga shu tugma tekshiruvi qo'shildi.
- Tekshirilmagan: ikki monitorli ulanish, logotipli jamoa slaydlari, telefonda ko'rinish.

## 5-bosqich: bulut ma'lumotlar bazasi (IndexedDB o'rniga)
- **Saqlash:** mavzu/raund/savol/jamoa/dizayn — Upstash Redis (`api/kv.js`); rasm/audio/video — Vercel Blob (`api/upload.js`, `api/media.js`). Brauzerdan 4.5 MB dan katta fayllar ham to'g'ridan-to'g'ri Blob'ga yuklanadi.
- **Parol:** endi server tekshiradi (`ADMIN_PASSWORD`, `api/login.js`); barcha API so'rovlari parolsiz rad etiladi. Ilgari parol faqat brauzerda edi.
- **Ikki qurilma:** boshqa qurilmadan kirilganda bir xil ma'lumot chiqadi. Bir vaqtda tahrirlashda versiya (`rev`) tekshiruvi ma'lumot ustidan yozilishini oldini oladi.
- **Zaxira rejim:** server topilmasa dastur avvalgidek IndexedDB bilan ishlaydi va buni Sozlamalarda ko'rsatadi. Eski ma'lumotlarni bulutga ko'chirish tugmasi qo'shildi.
- **Tekshirilgan (haqiqiy Chromium + haqiqiy `api/` kodi, soxta Redis):** parol (noto'g'ri/to'g'ri), A qurilmada saqlab B qurilmada ko'rish va ijro etish, bir vaqtda tahrirlash to'qnashuvi, sahifani yangilagandan keyin holat. `npm test` — 9 ta to'plam (API bilan) muvaffaqiyatli.
- **Tekshirilmagan (Vercel'ga haqiqiy deploy va yuklash kerak):** haqiqiy Upstash va Blob bilan ishlash; rasm/audio/video yuklash (brauzer `@vercel/blob` mijozini `esm.sh` dan yuklaydi, bu muhitda internet yo'q edi); Blob'dagi audio vizualizatori (CORS); `/api/upload` ning haqiqiy token berish yo'li.
