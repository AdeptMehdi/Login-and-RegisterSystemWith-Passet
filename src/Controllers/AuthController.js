
const bcrypt = require("bcrypt");
const User = require("../Entities/User");
const AuditLog = require("../Entities/AuditLog");
const { issueToken } = require("../Services/PasetoService");



function clientInfo(req) {
  return {
    ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress,
    ua: req.headers["user-agent"]
  };
}

async function register(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "email, username, password are required" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, username, passwordHash });

    const info = clientInfo(req);
    await AuditLog.create({ userId: user.id, action: "register", ipAddress: info.ip, userAgent: info.ua });

    res.status(201).json({ message: "User registered", id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = await issueToken(user.id);

    const info = clientInfo(req);
    await AuditLog.create({ userId: user.id, action: "login", ipAddress: info.ip, userAgent: info.ua });

    res.json({ access_token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
}

module.exports = { register, login };
