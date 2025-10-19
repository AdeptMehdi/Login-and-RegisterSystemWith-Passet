// src/services/pasetoService.js
const fs = require("fs");
const path = require("path");
const { V4 } = require("paseto");

// مسیر فایل‌ها
const privateKeyPath = path.join(__dirname, "../../keys/private.key");
const publicKeyPath  = path.join(__dirname, "../../keys/public.key");

// بارگذاری کلیدها
const privateKey = fs.readFileSync(privateKeyPath);
const publicKey  = fs.readFileSync(publicKeyPath);

async function issueToken(userId) {
  const now = new Date();
  const exp = new Date(now.getTime() + 15 * 60 * 1000); // 15 دقیقه

  return await V4.sign(
    {
      sub: String(userId),
      iss: "auth-api",
      aud: "web",
      iat: now.toISOString(),
      exp: exp.toISOString()
    },
    privateKey
  );
}

async function verifyToken(token) {
  return await V4.verify(token, publicKey, { issuer: "auth-api", audience: "web" });
}

module.exports = { issueToken, verifyToken };
