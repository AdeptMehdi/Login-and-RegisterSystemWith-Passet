const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(255), allowNull: false },
  username: { type: DataTypes.STRING(100), allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "Users",
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ["email"]
    }
  ]
});


module.exports = User;
