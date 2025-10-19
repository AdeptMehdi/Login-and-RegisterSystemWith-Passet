
const express = require("express");
const router = express.Router();
const RoleController = require("../Controllers/RoleController");

router.post("/roles", RoleController.createRole);
router.post("/permissions", RoleController.createPermission);
router.post("/roles/:roleId/permissions/:permissionId", RoleController.addPermissionToRole);
router.post("/users/:userId/roles/:roleId", RoleController.addRoleToUser);
router.get("/roles/:id", RoleController.getRole);
router.get("/users/:id", RoleController.getUser);

module.exports = router;
