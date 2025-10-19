# 📖 Login & Register System with PASETO (Node.js + Sequelize + SQL Server)

## 🚀 Features
- ثبت‌نام کاربر با **bcrypt** (هش پسورد)  
- ورود کاربر و دریافت **Access Token** با **PASETO v4 (Ed25519)**  
- مدیریت دیتابیس با **Sequelize ORM** و **SQL Server**  
- ذخیره‌ی لاگ فعالیت‌ها در جدول `AuditLogs`  
- ساختار ماژولار (Entities, Services, Controllers)  

---

## 📂 Project Structure
```
src/
├── Controllers/
│   └── AuthController.js
├── Entities/
│   ├── User.js
│   ├── Role.js
│   ├── Permission.js
│   └── RolePermission.js
├── Services/
│   └── PasetoService.js
├── keys/
│   ├── private.key  (64-byte Ed25519 private key, hex)
│   └── public.key   (32-byte Ed25519 public key, hex)
├── db.js            (Sequelize connection)
├── app.js           (Express app entrypoint)
└── generate-keys.js (script to generate keys)
```

---

## ⚙️ Installation
```bash
# کلون کردن پروژه
git clone https://github.com/AdeptMehdi/Login-and-RegisterSystemWith-Passet.git
cd Login-and-RegisterSystemWith-Paset

# نصب پکیج‌ها
npm install
```

---

## 🗄️ Database Setup
SQL Server باید نصب و در حال اجرا باشه.

یک دیتابیس به اسم `AuthDb` بساز:

```sql
CREATE DATABASE AuthDb;
```

در فایل `src/db.js` تنظیمات اتصال رو تغییر بده:

```js
const sequelize = new Sequelize("AuthDb", "sa", "your_password", {
  host: "localhost",
  dialect: "mssql",
  dialectModule: require("tedious"),
  logging: false
});
```

---

## 🔑 Generate Keys
برای تولید کلیدهای PASETO (Ed25519):

```bash
node src/generate-keys.js
```

این دستور دو فایل می‌سازه:

```
src/keys/private.key → کلید خصوصی (۶۴ بایت، hex)
src/keys/public.key  → کلید عمومی (۳۲ بایت، hex)
```

---

## ▶️ Run the Server
```bash
npm start
```
خروجی:
```
Private key length: 64
Public key length: 32
Server running on http://localhost:3000
```

---

## 📡 API Endpoints

### 🔹 Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "username": "mahdi",
  "password": "123456"
}
```

### 🔹 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

✅ پاسخ:
```json
{
  "access_token": "v4.public.eyJzdWIiOiIxIiwi..."
}
```

### 🔹 Protected Route (مثال)
```http
GET /user/me
Authorization: Bearer <access_token>
```

---

## 📝 Notes
- Access Token فقط ۱۵ دقیقه اعتبار داره.  
- برای استفاده‌ی واقعی باید **Refresh Token** و **Rotation** اضافه بشه.  
- کلید خصوصی (`private.key`) رو هرگز در ریپو پابلیک نذار.
