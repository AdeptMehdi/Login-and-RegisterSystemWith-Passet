const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RefreshToken = sequelize.define("RefreshToken", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "RefreshTokens"
});

module.exports = RefreshToken;
