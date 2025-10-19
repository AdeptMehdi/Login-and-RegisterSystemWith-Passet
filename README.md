# 📖 Login and Register System with PASETO, RBAC/ABAC

یک سیستم احراز هویت و مدیریت نقش/دسترسی ساخته‌شده با **Node.js**, **Express**, **Sequelize (MSSQL)** و **PASETO**. این پروژه شامل ثبت‌نام، ورود، صدور توکن امن، و مدیریت نقش‌ها و دسترسی‌هاست.

---

## ✨ قابلیت‌ها / Features
- ثبت‌نام کاربر جدید (Register)  
- ورود کاربر و دریافت Access Token (Login)  
- ذخیره امن رمز عبور با **bcrypt**  
- صدور و اعتبارسنجی توکن با **PASETO (v4.public)**  
- Middleware برای احراز هویت (`authMiddleware`)  
- Endpoint `/user/me` برای دریافت پروفایل کاربر لاگین‌شده  
- سیستم نقش‌ها (Roles) و دسترسی‌ها (Permissions) با روابط Many-to-Many  
- کنترل دسترسی قابل توسعه (RBAC / ABAC)

---

## 📦 نصب و راه‌اندازی / Quick Start
1. کلون کردن پروژه
```bash
git clone <repo-url>
cd Login-and-RegisterSystemWith-Paseto
```

2. نصب پکیج‌ها
```bash
npm install
```

3. تنظیم متغیرهای محیطی — یک فایل `.env` بساز و مقادیر زیر رو قرار بده:
```env
DB_HOST=localhost
DB_USER=sa
DB_PASS=yourStrong(!)Password
DB_NAME=AuthDB
DB_DIALECT=mssql

PASETO_PRIVATE_KEY=<hex 64-byte or other secure format>
PASETO_PUBLIC_KEY=<hex 32-byte or other secure format>
PORT=3000
```

4. اجرای پروژه
```bash
npm start
```

---

## 🚀 API Endpoints
### Auth
- `POST /auth/register` → ثبت‌نام کاربر جدید  
  Body: `{ email, username, password }`

- `POST /auth/login` → ورود و دریافت توکن  
  Body: `{ email, password }`  
  Response: `{ access_token }` (توکن در هدر یا کوکی امن ارسال می‌شود بسته به پیاده‌سازی)

### User
- `GET /user/me` → دریافت اطلاعات کاربر لاگین‌شده  
  Requires `Authorization: Bearer <token>` header

---

## 📂 ساختار پوشه‌ها / Project Structure
```
src/
 ├── app.js              # نقطه شروع برنامه
 ├── db.js               # اتصال به دیتابیس (Sequelize)
 ├── Entities/           # مدل‌های Sequelize (User, Role, Permission, RolePermission)
 ├── Services/           # سرویس‌ها (PasetoService, AuthService, RBAC service ...)
 ├── middlewares/        # middlewareها (authMiddleware, rbacMiddleware)
 ├── routes/             # مسیرهای API (auth, user, admin ...)
 └── utils/              # ابزارهای کمکی (hashing, validators, etc.)
```

---

## 🛡️ نکات امنیتی / Security Notes
- استفاده از **PASETO v4.public** به جای JWT برای امنیت بیشتر.  
- رمزگذاری و هش‌کردن پسوردها با **bcrypt**.  
- ارسال توکن‌ها با `HttpOnly` cookie یا `Authorization` header (بسته به نیاز).  
- طراحی ماژولار برای افزودن Refresh Token، Token Rotation یا الگوریتم‌های سیاست‌گذاری دسترسی (ABAC).

---

## 📌 آینده / Roadmap
- اضافه کردن **Refresh Token** و استراتژی‌های امنی مانند token rotation.  
- پیاده‌سازی **Migration** و **Seeder** برای درج Roles/Permissions اولیه.  
- توسعه کنترل دسترسی پیشرفته (ABAC)، سیاست‌های مبتنی بر Attribute و Context.  

---

اگر خواستی، همین فایل رو توی مسیر پروژه‌ات بنویسم و یا یک نسخه انگلیسیِ کامل‌تر با مثال‌های کد و نمونه‌های DB Schema براش بسازم.»
