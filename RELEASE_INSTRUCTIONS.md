# 🚀 دستورالعمل انتشار نسخه جدید برای Google Play و App Store

## پیش‌نیازها

### برای Android (Google Play Store):
1. **Signing Key** - ایجاد یا استفاده از signing key موجود
2. **Google Play Developer Account** - ثبت‌نام و تأیید تجاری
3. **Gradle Wrapper** - فایل gradle-wrapper.jar درست

### برای iOS (App Store):
1. **Apple Developer Account** - ثبت‌نام و اشتراک فعال
2. **Certificates** - Signing certificate و Distribution certificate
3. **Provisioning Profiles** - Profile برای App Store Distribution
4. **Xcode** - نسخه آخر

---

## مرحله 1: تنظیم Secrets در GitHub

### برای Android:
```
Going to: Settings → Secrets and Variables → Actions → New repository secret
```

اضافه کنید:
- `ANDROID_KEY_ALIAS` - نام alias key
- `ANDROID_KEY_PASSWORD` - رمز عبور key
- `ANDROID_STORE_FILE` - Base64 encoded keystore file
- `ANDROID_STORE_PASSWORD` - رمز عبور keystore

**نحوه ایجاد ANDROID_STORE_FILE:**
```bash
base64 -i my-signing-key.jks > keystore_base64.txt
# محتوای فایل را کپی کنید و به Secret اضافه کنید
```

### برای iOS:
```
Going to: Settings → Secrets and Variables → Actions → New repository secret
```

اضافه کنید:
- `APPSTORE_ISSUER_ID` - App Store Connect Issuer ID
- `APPSTORE_API_KEY_ID` - App Store Connect API Key ID
- `APPSTORE_API_PRIVATE_KEY` - App Store Connect API Private Key
- `IOS_PROVISIONING_PROFILE_NAME` - نام Provisioning Profile

---

## مرحله 2: آماده‌سازی پروژه

### Android:
```bash
# 1. Gradle wrapper را درست کنید
cd android
gradle wrapper --gradle-version 8.0.2

# 2. Build gradle را کنفیگ کنید
# android/app/build.gradle میں signing config اضافه کنید
```

### iOS:
```bash
# 1. pod install
cd ios/App
pod install --repo-update

# 2. exportOptions.plist ایجاد کنید
```

---

## مرحله 3: نسخه را بامپ کنید

```bash
# به feature/production-release برنچ بروید
git checkout feature/production-release

# Workflow را اجرا کنید
# GitHub Actions → Version Bump and Tag → Run workflow
# Version type انتخاب کنید (major, minor, patch)
```

---

## مرحله 4: Build و Release

### خودکار (با هر push به feature/production-release):
```bash
git push origin feature/production-release
```

Workflow‌ها خودکار اجرا می‌شوند:
- ✅ `build-android-release.yml` - AAB برای Play Store
- ✅ `build-ios-release.yml` - IPA برای App Store

### دستی:
بروید به GitHub Actions و Workflow را اجرا کنید.

---

## مرحله 5: آپلود به Store

### Google Play Store:
1. بروید به [Play Console](https://play.google.com/console)
2. \"Release\" → \"Create new release\"
3. AAB فایل را آپلود کنید
4. Screenshots و Description اضافه کنید
5. Review و Submit

### App Store:
1. بروید به [App Store Connect](https://appstoreconnect.apple.com)
2. \"My Apps\" → \"Golarys\"
3. \"Version or Platform\" → \"Create version\"
4. IPA را آپلود کنید (یا TestFlight)
5. Screenshots و Review کنید
6. \"Submit for Review\"

---

## مشکلات رایج و حل

### مشکل: \"Invalid or corrupt jarfile gradle-wrapper.jar\"
**حل:**
```bash
cd android
gradle wrapper --gradle-version 8.0.2
```

### مشکل: \"Pod install failed\"
**حل:**
```bash
cd ios/App
rm -rf Pods Podfile.lock
pod install --repo-update
```

### مشکل: iOS Signing Errors
**حل:**
```bash
# Xcode میں Team ID تنظیم کریں
# یا Automatic Signing enable کریں
```

---

## فایل‌های مهم

```
├── .github/workflows/
│   ├── build-android-release.yml ✅
│   ├── build-ios-release.yml ✅
│   └── version-bump.yml ✅
├── android/
│   ├── gradle/wrapper/gradle-wrapper.jar (FIX NEEDED)
│   └── gradle.properties
└── ios/App/
    └── exportOptions.plist
```

---

## Resources

- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Capacitor Deployment](https://capacitorjs.com/docs/guides/deploying-updates)
- [GitHub Actions](https://docs.github.com/en/actions)
