
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AuthDb", "sa", "mahdi123", {
  host: "localhost",
  dialect: "mssql",
  dialectModule: require("tedious"),
  logging: false, // برای شروع بی‌صداست؛ بعداً می‌تونی روشنش کنی
  pool: { max: 10, min: 0, idle: 10000 }
});

module.exports = sequelize;
