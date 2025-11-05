import express from "express";
import cors from "cors";
import { router as authRouter } from "./routes/auth.js";
import { router as itemRouter } from "./routes/items.js";

const app = express();
const PORT = 5000;
export const JWT_SECRET = "YangPentingEmiliaAja";

// Konfigurasi Middleware
app.use(cors());
app.use(express.json());

// Base URL API: /api
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);

app.get("/", (req, res) => {
  res.send("Backend berjalan. Akses API di /api/auth atau /api/items");
});

// Konfigurasi Menjalankan Server
app.listen(PORT, () => {
  console.log(`✅ Backend berjalan di http://localhost:${PORT}`);
});
