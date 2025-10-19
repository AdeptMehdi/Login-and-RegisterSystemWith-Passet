
const express = require("express");
const auth = require("../Middlewares/authMiddleware");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  res.json({ userId: req.user.id });
});

module.exports = router;
