# 🚀 راهنمای انتشار برای Google Play Store و App Store

## ✅ مرحله 1: درست کردن Gradle Wrapper (فوری)

```bash
cd android
gradle wrapper --gradle-version 8.0.2
git add gradle/wrapper/
git commit -m "fix: update gradle wrapper"
git push origin main
```

---

## ✅ مرحله 2: تنظیم Secrets در GitHub

### برای Google Play Store (Android):

1. بروید به: `Settings → Secrets and variables → Actions`
2. اضافه کنید:

```
ANDROID_KEY_ALIAS = your-alias
ANDROID_KEY_PASSWORD = your-password
ANDROID_STORE_FILE = (Base64 keystore)
ANDROID_STORE_PASSWORD = your-password
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON = (JSON content)
```

**نحوه Base64 کردن keystore:**
```bash
base64 -i my-signing-key.jks | pbcopy
```

### برای App Store (iOS):

1. بروید به: `Settings → Secrets and variables → Actions`
2. اضافه کنید:

```
APPSTORE_ISSUER_ID = your-issuer-id
APPSTORE_API_KEY_ID = your-key-id
APPSTORE_API_PRIVATE_KEY = your-private-key
IOS_PROVISIONING_PROFILE_NAME = your-profile-name
```

---

## ✅ مرحله 3: Workflows اضافه شدند

✅ **`.github/workflows/build-android-release.yml`** - برای Google Play Store
✅ **`.github/workflows/build-ios-release.yml`** - برای App Store

---

## 🚀 مرحله 4: Build و Release

### خودکار:
```bash
git push origin main
```

Workflows خودکار اجرا می‌شن!

### دستی:
بروید به `GitHub → Actions → Build Android/iOS Release → Run workflow`

---

## 📦 خروجی:

- ✅ **Android AAB** - برای Google Play Store
- ✅ **iOS Archive** - برای App Store
- ✅ **GitHub Release** - با تمام فایل‌ها

---

## 🎯 نکات مهم:

1. **Gradle Wrapper ضروری است** - درست کنید ابتدا
2. **Secrets محفوظ هستند** - فقط Actions استفاده می‌کنند
3. **AAB > APK** - Google Play فقط AAB می‌پذیرد
4. **Version Tagging** - هر Release خودکار tag می‌گیرد

---

## 📱 آپلود به Store:

### Google Play Store:
1. `play.google.com/console`
2. Upload AAB فایل
3. Screenshots و Description
4. Submit for Review

### App Store:
1. `appstoreconnect.apple.com`
2. Upload Archive/IPA
3. Test Flight یا Direct
4. Submit for Review

---

**همه چیز آماده است! فقط Gradle Wrapper و Secrets را تنظیم کن و push کن! 🎉**
