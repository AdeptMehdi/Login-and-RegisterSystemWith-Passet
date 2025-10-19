
const express = require("express");
const { issueToken, verifyToken } = require("../Services/PasetoService");
const router = express.Router();

router.get("/token", async (req, res) => {
  const token = await issueToken(123);
  res.json({ token });
});

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyToken(token);
    res.json({ payload });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
