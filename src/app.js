// src/app.js
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import sequelize from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Associations
import { User, Role, Permission } from "./Entities/associations.js";

// Entities (فقط import کن تا اجرا بشن)
import "./Entities/User.js";
import "./Entities/Role.js";
import "./Entities/Permission.js";
import "./Entities/RolePermission.js";
import "./Entities/EmailVerification.js";
import "./Entities/AuditLog.js";

// Routes
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";

dotenv.config();

const app = express();

// 🔹 اول CORS (قبل از همه‌ی routeها)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔹 Middlewareهای عمومی
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 🔹 Routeها
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/test", testRoutes);
app.use("/api", roleRoutes);
app.use("/analytics", analyticsRoutes);

// 🔹 Start Server
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

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
