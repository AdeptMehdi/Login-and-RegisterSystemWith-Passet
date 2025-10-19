const { verifyToken } = require("../services/pasetoService");

async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = auth.slice(7);
    const payload = await verifyToken(token);

    
    req.user = {
      id: payload.sub,
      iss: payload.iss,
      aud: payload.aud,
      roles: payload.roles || []
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
