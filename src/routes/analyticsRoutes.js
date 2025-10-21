// src/routes/analyticsRoutes.js
import express from "express";
import { trackEvent, getReports } from "../Controllers/AnalyticsController.js";

const router = express.Router();

router.post("/event", trackEvent);
router.get("/report", getReports);

export default router;
