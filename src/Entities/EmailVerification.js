const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const EmailVerification = sequelize.define("EmailVerification", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  used: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "EmailVerifications"
});

module.exports = EmailVerification;
