const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../Entities/User");
const AuditLog = require("../Entities/AuditLog");
const RefreshToken = require("../Entities/RefreshToken");
const { issueToken } = require("../Services/PasetoService");
const { encrypt, decrypt } = require("../utils/crypto"); 

function clientInfo(req) {
  return {
    ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress,
    ua: req.headers["user-agent"]
  };
}


// Register
async function register(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "email, username, password are required" });
    }

    const exists = await User.findOne({ 
      where: { email },
      attributes: ["id"] 
    });
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, username, passwordHash });

    // 🔑 پیدا کردن نقش user و اتصال به کاربر
    const { Role } = require("../Entities/associations");
    const userRole = await Role.findOne({ where: { name: "user" } });
    if (userRole) {
      await user.addRole(userRole);
    }

    // ثبت لاگ
    const info = clientInfo(req);
    AuditLog.create({
      userId: user.id,
      action: "register",
      ipAddress: info.ip,
      userAgent: info.ua
    }).catch(err => console.error("AuditLog error:", err));

    return res.status(201).json({ message: "User registered", id: user.id });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}


// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // Access Token (15 دقیقه)
    const accessToken = await issueToken(user.id);

    // Refresh Token (7 روز)
    const refreshToken = crypto.randomBytes(32).toString("hex");
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // رمزگذاری و ذخیره در کوکی HttpOnly
    const encrypted = await encrypt(refreshToken);
    res.cookie("refresh_token", encrypted, {
      httpOnly: true,
      secure: true,       // فقط روی HTTPS
      sameSite: "strict", // جلوگیری از CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const info = clientInfo(req);
    await AuditLog.create({ userId: user.id, action: "login", ipAddress: info.ip, userAgent: info.ua });

    return res.json({ access_token: accessToken });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}

// Refresh
async function refresh(req, res) {
  try {
    const encrypted = req.cookies?.["refresh_token"];
    if (!encrypted) return res.status(401).json({ error: "No refresh token" });

    const refreshToken = await decrypt(encrypted);

    const stored = await RefreshToken.findOne({ where: { token: refreshToken, revoked: false } });
    if (!stored || stored.expiresAt < new Date()) {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    const newAccessToken = await issueToken(stored.userId);

    // Rotation
    const newRefreshToken = crypto.randomBytes(32).toString("hex");
    stored.revoked = true;
    await stored.save();

    await RefreshToken.create({
      token: newRefreshToken,
      userId: stored.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const encryptedNew = await encrypt(newRefreshToken);
    res.cookie("refresh_token", encryptedNew, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}

// Logout
async function logout(req, res) {
  try {
    const encrypted = req.cookies?.["refresh_token"];
    if (encrypted) {
      const refreshToken = await decrypt(encrypted);
      const stored = await RefreshToken.findOne({ where: { token: refreshToken, revoked: false } });
      if (stored) {
        stored.revoked = true;
        await stored.save();
      }
    }

    res.clearCookie("refresh_token");
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}

module.exports = { register, login, refresh, logout };
