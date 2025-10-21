// src/middlewares/logEvent.js
import { UAParser } from "ua-parser-js";
import { insertLog } from "../Entities/UserActivityLogs.js";

export async function logEvent(req, { userId, usernameAttempt, eventType, metadata }) {
const parser = new UAParser(req.headers["user-agent"]);
const deviceInfo = parser.getResult();


  await insertLog({
    userId,
    usernameAttempt,
    eventType,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    browser: deviceInfo.browser.name,
    os: deviceInfo.os.name,
    device: deviceInfo.device.type || "desktop",
    location: {}, // بعداً GeoIP اضافه می‌کنیم
    metadata
  });
}
