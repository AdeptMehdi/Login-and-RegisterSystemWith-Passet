// // src/seed.js
// const sequelize = require("./db");
// const { User, Role, Permission } = require("./Entities/associations");

// async function seed() {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync({ force: true });


//     // ساخت نقش‌ها
//     const [adminRole] = await Role.findOrCreate({
//       where: { name: "admin" },
//       defaults: { description: "مدیر سیستم" }
//     });

//     const [userRole] = await Role.findOrCreate({
//       where: { name: "user" },
//       defaults: { description: "کاربر عادی" }
//     });

//     // ساخت دسترسی‌ها
//     const [manageUsers] = await Permission.findOrCreate({
//       where: { name: "manage_users" },
//       defaults: { description: "توانایی مدیریت کاربران" }
//     });

//     const [viewReports] = await Permission.findOrCreate({
//       where: { name: "view_reports" },
//       defaults: { description: "توانایی مشاهده گزارش‌ها" }
//     });

//     // اتصال دسترسی‌ها به نقش admin
//     await adminRole.addPermission(manageUsers);
//     await adminRole.addPermission(viewReports);

//     // اتصال دسترسی‌ها به نقش user
//     await userRole.addPermission(viewReports);

//     // ساخت کاربر ادمین
//     const [adminUser] = await User.findOrCreate({
//       where: { email: "admin@example.com" },
//       defaults: {
//         username: "admin",
//         passwordHash: "123456", // اینو بعداً با bcrypt بساز
//         isEmailVerified: true
//       }
//     });

//     // اتصال کاربر به نقش admin
//     await adminUser.addRole(adminRole);

//     console.log("✅ داده‌های اولیه ساخته شدند");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ خطا در seeding:", err);
//     process.exit(1);
//   }
// }

// seed();
