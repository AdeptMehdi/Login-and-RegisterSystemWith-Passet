// src/services/pasetoService.js
const fs = require("fs");
const path = require("path");
const { V4 } = require("paseto");

const privateKeyHex = fs.readFileSync(path.join(__dirname, "../keys/private.key"), "utf8").trim();
const publicKeyHex  = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8").trim();

const privateKey = Buffer.from(privateKeyHex, "hex"); // باید 64 بایت باشه
const publicKey  = Buffer.from(publicKeyHex, "hex");  // باید 32 بایت باشه

console.log("Private key length:", privateKey.length);
console.log("Public key length:", publicKey.length);

async function issueToken(userId) {
  const now = new Date();
  const exp = new Date(now.getTime() + 15 * 60 * 1000);

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
