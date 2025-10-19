const express = require("express");
const mongoose = require("mongoose");
const { register, login } = require("./controllers/authController");

const app = express();
app.use(express.json());

// اتصال به MongoDB
mongoose.connect("mongodb://localhost:27017/authdb");

// مسیرها
app.post("/auth/register", register);
app.post("/auth/login", login);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
