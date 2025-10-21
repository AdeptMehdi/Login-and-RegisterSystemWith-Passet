// src/models/UserActivityLogs.js
import db from "../db.js";

export async function insertLog({
  userId,
  usernameAttempt,
  eventType,
  ip,
  userAgent,
  browser,
  os,
  device,
  location,
  metadata
}) {
  const query = `
    INSERT INTO UserActivityLogs
    (user_id, username_attempt, event_type, ip, user_agent, browser, os, device, location, metadata)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  `;
  const values = [
    userId || null,
    usernameAttempt || null,
    eventType,
    ip,
    userAgent,
    browser,
    os,
    device,
    location ? JSON.stringify(location) : null,
    metadata ? JSON.stringify(metadata) : null
  ];
  await db.query(query, values);
}
