import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../server.js";

// Konfigurasi Middleware untuk memverifikasi token JWT dari header Authorization.
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        message: "Akses ditolak. Token tidak ditemukan atau format salah.",
      });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau tidak sesuai. Silakan lakukan login kembali." });
  }
};
