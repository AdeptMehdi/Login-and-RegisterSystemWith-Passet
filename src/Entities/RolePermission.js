const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RolePermission = sequelize.define("RolePermission", {
  roleId: { type: DataTypes.BIGINT, allowNull: false },
  permissionId: { type: DataTypes.BIGINT, allowNull: false }
}, {
  tableName: "RolePermissions",
  timestamps: false,
  indexes: [
    { unique: true, fields: ["roleId", "permissionId"] }
  ]
});

module.exports = RolePermission;
