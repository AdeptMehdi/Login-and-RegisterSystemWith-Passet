const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Permission = sequelize.define("Permission", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: "Permissions",
  timestamps: false
});

module.exports = Permission;
