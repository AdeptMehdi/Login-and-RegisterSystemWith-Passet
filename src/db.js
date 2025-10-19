const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AuthDb", "sa", "mahdi123", {
  host: "localhost",
  dialect: "mssql",
  dialectModule: require("tedious"),
  logging: false
});

module.exports = sequelize;
