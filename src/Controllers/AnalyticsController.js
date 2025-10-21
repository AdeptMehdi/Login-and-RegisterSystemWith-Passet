// src/controllers/analyticsController.js
import { logEvent } from "../Middlewares/logEventMiddleware.js";


export async function trackEvent(req, res) {
  const { eventType, metadata } = req.body;

  if (!eventType) {
    return res.status(400).json({ error: "eventType is required" });
  }

  await logEvent(req, {
    userId: req.user ? req.user.id : null, // اگر کاربر لاگین کرده باشه
    eventType,
    metadata
  });

  res.json({ message: "Event logged" });
}
