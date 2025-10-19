const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AuditLog = sequelize.define("AuditLog", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: true },
  action: { type: DataTypes.STRING(100), allowNull: false },
  ipAddress: { type: DataTypes.STRING(45), allowNull: true },
  userAgent: { type: DataTypes.STRING(255), allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "AuditLogs",
  updatedAt: false
});

module.exports = AuditLog;
