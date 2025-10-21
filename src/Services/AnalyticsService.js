import db from "../db.js";

// گزارش روزانه pageview
export async function getDailyPageviews() {
  const query = `
    SELECT CAST(created_at AS DATE) as day, COUNT(*) as views
    FROM dbo.UserActivityLogs
    WHERE event_type = 'pageview'
    GROUP BY CAST(created_at AS DATE)
    ORDER BY day DESC
  `;
  const result = await db.query(query);
  return result.recordset || result.rows || [];
}

// گزارش مرورگرها برای login_success
export async function getTopBrowsers() {
  const query = `
    SELECT browser, COUNT(*) as count
    FROM dbo.UserActivityLogs
    WHERE event_type = 'login_success'
    GROUP BY browser
    ORDER BY count DESC
  `;
  const result = await db.query(query);
  return result.recordset || result.rows || [];
}

export async function getEventSummary() {
  const query = `
    SELECT CAST(event_type AS NVARCHAR(50)) as event_type, COUNT(*) as total
    FROM dbo.UserActivityLogs
    GROUP BY CAST(event_type AS NVARCHAR(50))
    ORDER BY total DESC
  `;
  const result = await db.query(query);
  return result.recordset || result.rows || [];
}
