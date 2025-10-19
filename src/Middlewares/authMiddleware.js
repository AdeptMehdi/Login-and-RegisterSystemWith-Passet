// middlewares/authMiddleware.js
const { verifyToken } = require("../Services/PasetoService");
const { User, Role, Permission } = require("../Entities/associations");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.slice(7);
    const payload = await verifyToken(token);

    if (!payload) return res.status(401).json({ error: "Invalid token" });

    const userId = payload.userId || payload.sub;

    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        include: [Permission]
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
