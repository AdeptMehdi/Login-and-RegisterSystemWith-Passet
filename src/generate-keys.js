// src/generate-keys.js
const nacl = require("tweetnacl");
const fs = require("fs");
const path = require("path");

const keyPair = nacl.sign.keyPair();

// کلید خصوصی کامل (۶۴ بایت)
const privateKey = Buffer.from(keyPair.secretKey);
// کلید عمومی (۳۲ بایت)
const publicKey = Buffer.from(keyPair.publicKey);

const keysDir = path.join(__dirname, "keys");
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}

fs.writeFileSync(path.join(keysDir, "private.key"), privateKey.toString("hex"));
fs.writeFileSync(path.join(keysDir, "public.key"), publicKey.toString("hex"));

console.log("✅ Keys generated!");
console.log("Private key length:", privateKey.length); // باید 64 باشه
console.log("Public key length:", publicKey.length);   // باید 32 باشه
