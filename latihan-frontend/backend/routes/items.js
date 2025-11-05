import express from "express";
import { items, getNextItemId } from "../data/db.js";
import { protect } from "../middleware/auth.js";

export const router = express.Router();

// Menerapkan konfigurasi middleware protect ke semua route
router.use(protect);

// Endpoint GET /api/items (READ All)
router.get("/", (req, res) => {
  const currentUserId = req.userId;
  const userItems = items.filter(
    (item) => item.userId === currentUserId || item.userId === "dummyId"
  );

  console.log(
    `📝 GET /api/items diakses. Menampilkan ${userItems.length} item untuk userId: ${currentUserId}`
  );
  res.json(userItems);
});

// Endpoint POST /api/items (CREATE) 
router.post("/", (req, res) => {
  const { title, description } = req.body;

  const newItem = {
    id: getNextItemId(),
    title,
    description,
    userId: req.userId, 
  };

  items.push(newItem);
  console.log(
    `➕ Item baru ditambahkan (ID: ${newItem.id}) oleh userId: ${newItem.userId}`
  );
  res.status(201).json(newItem);
});

// Endpoint PUT /api/items/:id (UPDATE) 
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan." });
  }

  if (items[index].userId !== req.userId) {
    if (items[index].userId !== "dummyId") {
      return res
        .status(403)
        .json({ message: "Akses tidak sesuai. Tidak berhak mengedit data ini." });
    }
  }

  items[index] = { ...items[index], title, description };

  console.log(`✏️ Item diubah (ID: ${id}) oleh userId: ${req.userId}`);
  res.json(items[index]);
});

// Endpoint DELETE /api/items/:id (DELETE) 
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan." });
  }

  if (items[index].userId !== req.userId) {
    if (items[index].userId !== "dummyId") {
      return res
        .status(403)
        .json({ message: "Akses tidak sesuai. Tidak berhak mengedit data ini." });
    }
  }

  items.splice(index, 1);

  console.log(`🗑️ Item dihapus (ID: ${id}) oleh userId: ${req.userId}`);
  res.status(204).send();
});
