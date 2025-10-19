const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Permission = sequelize.define("Permission", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
});

module.exports = Permission;
