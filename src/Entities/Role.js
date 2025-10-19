const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Role = sequelize.define("Role", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
});

module.exports = Role;
