const User = require("./User");
const Role = require("./Role");
const Permission = require("./Permission");
const UserRole = require("./UserRole");
const RolePermission = require("./RolePermission");
const RefreshToken = require("./RefreshToken");
const AuditLog = require("./AuditLog");
const EmailVerification = require("./EmailVerification");

// User ↔ Role
User.belongsToMany(Role, { through: UserRole, foreignKey: "userId" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });

// Role ↔ Permission
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });

// User ↔ RefreshToken
User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// User ↔ AuditLog
User.hasMany(AuditLog, { foreignKey: "userId" });
AuditLog.belongsTo(User, { foreignKey: "userId" });

// User ↔ EmailVerification
User.hasMany(EmailVerification, { foreignKey: "userId" });
EmailVerification.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  RefreshToken,
  AuditLog,
  EmailVerification
};
