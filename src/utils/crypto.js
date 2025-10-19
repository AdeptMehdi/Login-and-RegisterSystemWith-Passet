const { webcrypto } = require("crypto");
const { subtle } = webcrypto;

const enc = new TextEncoder();
const dec = new TextDecoder();

const secretHex = process.env.COOKIE_SECRET || "519f0ef294dbbd6f0a8dde674a816c2bc3a0ac5dce7ec35651619c2fbbe1997f";
const secret = Buffer.from(secretHex, "hex");

if (![16, 24, 32].includes(secret.length)) {
  throw new Error(`❌ COOKIE_SECRET must be 16, 24, or 32 bytes. Got ${secret.length} bytes`);
}

async function getKey() {
  return await subtle.importKey(
    "raw",
    secret,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(text) {
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const encrypted = await subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  return Buffer.from(iv).toString("base64") + ":" + Buffer.from(encrypted).toString("base64");
}

async function decrypt(data) {
  const [ivB64, encrypted] = data.split(":");
  const iv = Buffer.from(ivB64, "base64");
  const key = await getKey();
  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    Buffer.from(encrypted, "base64")
  );
  return dec.decode(decrypted);
}

module.exports = { encrypt, decrypt };
