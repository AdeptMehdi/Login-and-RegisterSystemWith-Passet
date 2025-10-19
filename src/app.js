require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const sequelize = require("./db");

const { User, Role, Permission } = require("./Entities/associations");

require("./Entities/User");
require("./Entities/Role");
require("./Entities/Permission");
require("./Entities/RolePermission");
require("./Entities/EmailVerification.js");
require("./Entities/AuditLog");



const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // لاگ درخواست‌ها
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/api", roleRoutes);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // تست: گرفتن کاربر و نقش‌ها
    const user = await User.findByPk(1, { include: Role });
    console.log("User with roles:", JSON.stringify(user, null, 2));

    // تست: گرفتن نقش و دسترسی‌ها
    const role = await Role.findByPk(1, { include: Permission });
    console.log("Role with permissions:", JSON.stringify(role, null, 2));

    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🚀 Server running on http://localhost:${port}`)
    );
  } catch (err) {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  }
}

start();
