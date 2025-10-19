// src/entities/RolePermission.js
const sequelize = require("../db");
const Role = require("./Role");
const Permission = require("./Permission");

// جدول واسط بدون تعریف ستون‌ها
const RolePermission = sequelize.define("RolePermission", {}, {
  tableName: "RolePermissions",
  timestamps: false
});

// روابط
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });

module.exports = RolePermission;
