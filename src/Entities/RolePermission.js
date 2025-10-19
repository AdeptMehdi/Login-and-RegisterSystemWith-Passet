const {DataTypes}   = require("sequelize");
const sequelize = require("../db");
const Role = require("./Role");
const Permission = require("./Permission");

const RolePermission = sequelize.define("RolePermission", {
  roleId: { type: DataTypes.BIGINT, references: { model: Role, key: "id" } },
  permissionId: { type: DataTypes.BIGINT, references: { model: Permission, key: "id" } }
}, { timestamps: false });

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

module.exports = RolePermission;