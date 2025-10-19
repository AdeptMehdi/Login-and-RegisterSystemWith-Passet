
const { verifyToken } = require("../services/pasetoService");

async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
    const token = auth.slice(7);

    const payload = await verifyToken(token);
    req.user = { id: payload.sub, iss: payload.iss, aud: payload.aud };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
