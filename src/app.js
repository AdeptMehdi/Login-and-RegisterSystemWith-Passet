
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const sequelize = require("./db");


// موجودیت‌ها را فقط یک بار ایمپورت کن تا جداول ساخته شوند
require("./Entities/User");
require("./Entities/Role");
require("./Entities/Permission");
require("./Entities/RolePermission");
require("./Entities/EmailVerification.js");
require("./Entities/AuditLog");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");



const app = express();
app.use(express.json());
app.use(morgan("dev")); // لاگ درخواست‌ها
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // برای شروع، جداول را می‌سازد؛ در تولید بهتره از migrations استفاده کنی
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}


start();
