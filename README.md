# 📖 Authentication System with PASETO, AES‑GCM Cookies & Token Rotation

### 🧩 Description
A modern and secure **authentication system** using **PASETO v4**, **AES-GCM cookies**, and **token rotation**.  
Implements short-lived access tokens, encrypted refresh tokens, and detailed security audit logs — built with **Node.js**, **Express**, and **Sequelize**.  

نسخه فارسی 👇  
سیستم احراز هویت مدرن و ایمن با **PASETO v4**، **کوکی‌های رمزگذاری‌شده AES-GCM** و **چرخش توکن‌ها**، ساخته‌شده با **Node.js** و **Sequelize**.  

---

## 🚀 ویژگی‌ها
- **Access Token:** کوتاه‌مدت (۱۵ دقیقه) و فقط از طریق هدر Authorization ارسال می‌شود.  
- **Refresh Token:** بلندمدت (۷ روز)، ذخیره در دیتابیس و نگهداری در کوکی HttpOnly رمزگذاری‌شده با AES‑GCM.  
- **AES‑GCM:** رمزگذاری امن با تگ صحت برای جلوگیری از دستکاری.  
- **Token Rotation:** در هر بار رفرش، توکن جدید ساخته و قبلی باطل می‌شود.  
- **Audit Log:** ثبت عملیات Register، Login، Refresh و Logout همراه با IP و User-Agent.  
- **امنیت چندلایه:** کوکی‌های HttpOnly + Secure + SameSite=strict.  

---

## 📂 ساختار پروژه
```
src/
├── Controllers/
│   └── AuthController.js        → مدیریت Register، Login، Refresh، Logout
├── Services/
│   └── PasetoService.js         → صدور Access Token با PASETO
├── Entities/
│   ├── User.js                  → مدل کاربر (رمز عبور هش‌شده با bcrypt)
│   ├── RefreshToken.js          → ذخیره Refresh Token‌ها با تاریخ انقضا و وضعیت revoke
│   └── AuditLog.js              → ثبت لاگ امنیتی
├── utils/
│   └── crypto.js                → رمزگذاری/رمزگشایی Refresh Token با AES‑GCM
├── db.js                        → اتصال Sequelize
├── app.js                       → نقطه ورود Express
└── generate-keys.js             → ساخت کلیدهای PASETO
```

---

## ⚙️ تنظیمات محیطی
فایل `.env`:
```env
# کلیدهای Paseto (نمونه؛ باید امن تولید شوند)
PASETO_PRIVATE_KEY_HEX=<کلید خصوصی ۶۴ بایتی hex>
PASETO_PUBLIC_KEY_HEX=<کلید عمومی ۳۲ بایتی hex>

# کلید رمزگذاری کوکی (۳۲ بایت = ۶۴ کاراکتر hex)
COOKIE_SECRET=519f0ef294dbbd6f0a8dde674a816c2bc3a0ac5dce7ec35651619c2fbbe1997f

PORT=3000
```

---

## 🚀 اجرای پروژه
```bash
npm install
npm start
```

---

## 📡 API Endpoints

### 🔹 Register
```http
POST /auth/register
Body: { email, username, password }
Response: { message, id }
```

### 🔹 Login
```http
POST /auth/login
Body: { email, password }
Response: { access_token }
# Refresh Token در کوکی HttpOnly ذخیره می‌شود
```

### 🔹 Refresh
```http
POST /auth/refresh
# Refresh Token از کوکی خوانده می‌شود
Response: { access_token }
# Refresh Token جدید ساخته و کوکی به‌روزرسانی می‌شود
```

### 🔹 Logout
```http
POST /auth/logout
# Refresh Token از کوکی حذف و revoke می‌شود
Response: { message: "Logged out successfully" }
```

---

## 🔒 مدل امنیتی
- **Access Token:** کوتاه‌مدت، فقط در حافظه کلاینت نگهداری شود.  
- **Refresh Token:** در کوکی HttpOnly رمزگذاری‌شده → مقاوم در برابر XSS.  
- **SameSite=strict + Secure:** جلوگیری از CSRF و ارسال فقط روی HTTPS.  
- **Rotation:** کاهش ریسک سوءاستفاده از توکن دزدیده‌شده.  
- **Audit Log:** قابلیت بررسی رخدادها و پاسخ به حملات امنیتی.  

---

## 🛠️ نکات توسعه
- در محیط توسعه می‌توان `secure: false` گذاشت (برای تست روی HTTP).  
- در کلاینت باید `withCredentials: true` (axios) یا `credentials: "include"` (fetch) فعال باشد تا کوکی ارسال شود.  
- در محیط Production حتماً HTTPS فعال باشد.  
