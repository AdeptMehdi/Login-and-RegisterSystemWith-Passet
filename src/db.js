// src/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AuthDb", "sa", "mahdi123", {
  dialect: "mssql",
  dialectModule: require("tedious"),
  host: "DESKTOP-OUGG3OL",
  port: 1433,
  logging: false
});


module.exports = sequelize;
