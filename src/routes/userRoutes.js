// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, (req, res) => {
  const user = req.user;

  res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    roles: user.Roles.map(r => ({
      id: r.id,
      name: r.name,
      permissions: r.Permissions.map(p => p.name)
    }))
  });
});

module.exports = router;
