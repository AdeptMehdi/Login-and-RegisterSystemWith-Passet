const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AuthDb", "sa", "mahdi123", {
  dialect: "mssql",
  dialectModule: require("tedious"),
  host: "DESKTOP-OUGG3OL",
  port: 1433,
  logging: false,

  // 🔹 تنظیمات Connection Pool
  pool: {
    max: 10,       // حداکثر تعداد کانکشن همزمان
    min: 0,        // حداقل کانکشن
    acquire: 30000, // حداکثر زمان (ms) برای گرفتن کانکشن قبل از خطا
    idle: 10000    // حداکثر زمان (ms) بیکار بودن کانکشن قبل از آزاد شدن
  }
});

module.exports = sequelize;
