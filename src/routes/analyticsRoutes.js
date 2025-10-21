// src/routes/analytics.js
import express from "express";
import { trackEvent } from "../Controllers/AnalyticsController.js";

const router = express.Router();

// مسیر عمومی برای ثبت رخدادها
router.post("/event", trackEvent);

export default router;
