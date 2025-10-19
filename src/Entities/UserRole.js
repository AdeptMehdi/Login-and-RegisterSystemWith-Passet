const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserRole = sequelize.define("UserRole", {
  userId: { type: DataTypes.BIGINT, allowNull: false },
  roleId: { type: DataTypes.BIGINT, allowNull: false }
}, {
  tableName: "UserRoles",
  timestamps: false,
  indexes: [
    { unique: true, fields: ["userId", "roleId"] }
  ]
});

module.exports = UserRole;
