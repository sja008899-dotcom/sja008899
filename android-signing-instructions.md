# راهنمای امضا و انتشار نسخه نهایی اندروید گل آریس (Golarys)

این راهنما مراحل ساخت بسته نهایی (Release APK / AAB) اپلیکیشن موبایل **گل آریس (Golarys)** برای انتشار در گوگل‌پلی (Google Play)، بازار (CafeBazaar) و مایکت (Myket) را توضیح می‌دهد.

---

## ۱. مشخصات کلید امضا (Keystore)

- **فایل کلید:** `golarys-release.keystore`
- **Alias کلید:** `golarys-key`
- **الگوریتم:** RSA 2048-bit با اعتبار ۲۵ ساله
- **نام بسته (Package ID):** `ir.golarys.app`
- **نام نمایشی:** گل آریس | Golarys

---

## ۲. دستورات ساخت نسخه نهایی (Build Release)

### گام اول: بیلد فرانت‌اند و سینک با کپسیتور
```bash
npm run build
npx cap sync android
```

### گام دوم: بیلد APK امضاشده (برای بازار و مایکت)
```bash
cd android
./gradlew assembleRelease
```
فایل خروجی در مسیر زیر قرار می‌گیرد:
`android/app/build/outputs/apk/release/app-release.apk`

### گام سوم: بیلد AAB (برای گوگل‌پلی)
```bash
cd android
./gradlew bundleRelease
```
فایل خروجی در مسیر زیر قرار می‌گیرد:
`android/app/build/outputs/bundle/release/app-release.aab`

---

## ۳. تنظیمات متغیرهای محیطی در CI/CD (GitHub Actions)

در بخش **Settings > Secrets and variables > Actions** مخزن گیت‌هاب متغیرهای زیر را ثبت کنید:

1. `KEYSTORE_BASE64`: محتوای Base64 کلید امضا
2. `KEYSTORE_PASSWORD`: رمز عبور Keystore
3. `KEY_ALIAS`: `golarys-key`
4. `KEY_PASSWORD`: رمز عبور کلید

---

## ۴. آیکون و اسکرین‌شات‌های استور

- **آیکون استور (Hi-res Icon):** ابعاد 512x512 پیکسل در فرمت PNG با پس‌زمینه سبز تیره لوکس (`#17361A`) و نشان طلایی زنبق
- **اسپلش اسکرین:** رزولوشن‌های استاندارد در `android/app/src/main/res/drawable-*`
- **دسته استور:** Shopping / Lifestyle (خرید و سبک زندگی)
