const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Role = sequelize.define("Role", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: "Roles",
  timestamps: false
});

module.exports = Role;
