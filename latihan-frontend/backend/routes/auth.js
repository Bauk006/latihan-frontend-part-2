import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/db.js";
import { JWT_SECRET } from "../server.js";

export const router = express.Router();

// Endpoint POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email sudah terdaftar." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  console.log(`👤 User baru terdaftar: ${newUser.email}`);
  res.status(201).json({ message: "Registrasi berhasil" });
});

// Endpoint POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  console.log(`🔑 User login: ${user.email}, Token dibuat.`);
  res.json({ token, message: "Login berhasil" });
});

// Endpoint GET /api/auth/users
router.get("/users", (req, res) => {
  const safeUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  console.log(
    "🔎 DEBUG: Menampilkan daftar ${users.length} pengguna terdaftar."
  );
  res.json(safeUsers);
});
