
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const AuditLog = sequelize.define("AuditLog", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: true },
  action: { type: DataTypes.STRING(100), allowNull: false }, // login, verify, refresh, logout
  ipAddress: { type: DataTypes.STRING(45), allowNull: true },
  userAgent: { type: DataTypes.STRING(255), allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "AuditLogs",
  timestamps: false
});

AuditLog.belongsTo(User, { foreignKey: "userId" });

module.exports = AuditLog;
