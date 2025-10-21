// src/controllers/analyticsController.js
import { logEvent } from "../Middlewares/logEventMiddleware.js";
import { getDailyPageviews, getTopBrowsers, getEventSummary } from "../Services/analyticsService.js";



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

export async function getReports(req, res) {
  try {
    const summary = await getEventSummary();
    const daily = await getDailyPageviews();
    const browsers = await getTopBrowsers();

    res.json({
      summary,          // همه‌ی event_typeها
      dailyPageviews: daily,   // فقط pageview
      topBrowsers: browsers    // فقط login_success
    });
  } catch (err) {
    console.error("❌ Error in getReports:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
}
