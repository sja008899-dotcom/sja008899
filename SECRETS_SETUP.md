# 🔐 تنظیم Secrets برای Production Release

## مرحله 1: Android Signing Setup

### 1. Keystore File ایجاد کنید

```bash
# اگر keystore دارید:
keytool -list -v -keystore my-signing-key.jks

# اگر جدید ایجاد می‌کنید:
keytool -genkey -v -keystore my-signing-key.jks \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -alias golarys-key \
    -storepass mystorepass \
    -keypass mykeypass
```

### 2. Keystore را Base64 کنید

```bash
base64 -i my-signing-key.jks | tee keystore_base64.txt
```

### 3. Secrets اضافه کنید

بروید به: `GitHub Repository → Settings → Secrets and variables → Actions`

**اضافه کنید:**

| Secret Name | Value |
|---|---|
| `ANDROID_KEY_ALIAS` | `golarys-key` |
| `ANDROID_KEY_PASSWORD` | `mykeypass` |
| `ANDROID_STORE_FILE` | (محتوای keystore_base64.txt) |
| `ANDROID_STORE_PASSWORD` | `mystorepass` |

### 4. Google Play Service Account

**ایجاد Service Account:**

1. بروید به [Google Play Console](https://play.google.com/console)
2. Setup → API Access
3. \"Create new service account\" → Download JSON
4. JSON محتوا را کپی کنید

**Secret اضافه کنید:**

| Secret Name | Value |
|---|---|
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | (محتوای JSON) |

---

## مرحله 2: iOS Setup

### 1. App Store Connect API Key

**ایجاد API Key:**

1. بروید به [App Store Connect](https://appstoreconnect.apple.com)
2. Users and Access → Keys
3. \"Generate API Key\" با role \"App Manager\"
4. اطلاعات را ذخیره کنید

**Secrets اضافه کنید:**

| Secret Name | Value |
|---|---|
| `APPSTORE_ISSUER_ID` | (Issuer ID از App Store Connect) |
| `APPSTORE_API_KEY_ID` | (Key ID) |
| `APPSTORE_API_PRIVATE_KEY` | (Private Key - تمام متن) |

### 2. Provisioning Profile

**ایجاد Profile:**

1. بروید به [Apple Developer](https://developer.apple.com/account)
2. Certificates, IDs & Profiles
3. Provisioning Profiles → Distribution
4. \"Create\" → App Store
5. App ID انتخاب کنید
6. Certificates انتخاب کنید
7. دانلود کنید

**Secret اضافه کنید:**

| Secret Name | Value |
|---|---|
| `IOS_PROVISIONING_PROFILE_NAME` | (نام profile - مثلا: \"Golarys App Store\") |

---

## ⚠️ نکات ایمنی

1. **Private Keys را محفوظ نگه دارید:**
   - GitHub فقط مالک repo می‌تواند ببینید
   - هرگز keys را commit نکنید
   - .gitignore اضافه کنید:
   ```
   *.jks
   *.key
   *.p12
   ```

2. **Secrets Rotation:**
   - سالانه keys را تجدید کنید
   - در صورت compromise: فوری replace کنید

---

## منابع مفید

- [Keystore Tutorial](https://developer.android.com/studio/publish/app-signing#generate-key)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://help.apple.com/app-store-connect)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
