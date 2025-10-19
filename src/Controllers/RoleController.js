
const { Role, Permission, User } = require("../Entities/associations");

module.exports = {
  // ساخت نقش
  async createRole(req, res) {
    try {
      const { name, description } = req.body;
      const role = await Role.create({ name, description });
      res.status(201).json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ساخت دسترسی
  async createPermission(req, res) {
    try {
      const { name, description } = req.body;
      const permission = await Permission.create({ name, description });
      res.status(201).json(permission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // اتصال دسترسی به نقش
  async addPermissionToRole(req, res) {
    try {
      const { roleId, permissionId } = req.params;
      const role = await Role.findByPk(roleId);
      const permission = await Permission.findByPk(permissionId);

      if (!role || !permission) {
        return res.status(404).json({ error: "Role or Permission not found" });
      }

      await role.addPermission(permission);
      res.json({ message: "Permission added to role" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // دادن نقش به کاربر
  async addRoleToUser(req, res) {
    try {
      const { userId, roleId } = req.params;
      const user = await User.findByPk(userId);
      const role = await Role.findByPk(roleId);

      if (!user || !role) {
        return res.status(404).json({ error: "User or Role not found" });
      }

      await user.addRole(role);
      res.json({ message: "Role added to user" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // گرفتن نقش با دسترسی‌ها
  async getRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id, { include: Permission });
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // گرفتن کاربر با نقش‌ها
  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { include: Role });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
