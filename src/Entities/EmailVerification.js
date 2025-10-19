
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const EmailVerification = sequelize.define("EmailVerification", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  codeHash: { type: DataTypes.STRING, allowNull: false }, // bcrypt
  token: { type: DataTypes.STRING, allowNull: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  consumed: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "EmailVerifications",
  timestamps: false
});

EmailVerification.belongsTo(User, { foreignKey: "userId" });

module.exports = EmailVerification;
