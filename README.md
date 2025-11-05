# Proyek: Aplikasi CRUD & Autentikasi Full-Stack (Frontend Part 2)

## 1. Judul Aplikasi dan Deskripsi Singkat

**Aplikasi Manajemen Item Pribadi**

Sebuah aplikasi *full-stack* sederhana menggunakan React di sisi *frontend* dan Node.js/Express di sisi *backend*. Fungsinya mencakup operasi **CRUD (Create, Read, Update, Delete)** serta **autentikasi pengguna dengan JWT (JSON Web Token)**. Semua data disimpan secara sementara di memori server (*in-memory database*).

## 2. Fitur-fitur

### Fitur Utama

- **Autentikasi JWT:** Pengguna dapat registrasi dan login untuk mendapatkan token otorisasi.
- **Rute Terproteksi:** Semua endpoint CRUD hanya bisa diakses jika pengguna memiliki token valid.
- **Data Pribadi:** Tiap pengguna hanya bisa mengelola item miliknya (difilter berdasarkan `userId`).
- **Dashboard Dinamis:** CRUD dijalankan secara interaktif lewat *modals* dan React Hooks tanpa perlu *reload* halaman.
- **Navigasi Aman:** Menggunakan `react-router-dom` dengan komponen `PrivateRoute` agar hanya pengguna login yang bisa mengakses *Dashboard*.

### Teknologi yang Digunakan

| Kategori | Frontend (`latihan-frontend`) | Backend (`backend`) |
| :--- | :--- | :--- |
| **Utama** | React.js (CRA) | Node.js + Express |
| **Routing** | `react-router-dom` | Express Router |
| **UI/Styling** | `react-bootstrap`, `bootstrap` | - |
| **HTTP Client** | `axios` | `cors` |
| **Keamanan** | - | `jsonwebtoken`, `bcryptjs` |

## 3. Persyaratan Aplikasi

Sebelum menjalankan aplikasi, pastikan Anda sudah memiliki:

- **Node.js & npm/yarn:** Versi 14 atau lebih baru (disarankan versi terbaru).
- **Git:** Untuk mengelola kode.
- **Postman (opsional):** Untuk menguji API secara manual.

## 4. Instalasi dan Cara Menjalankan

Aplikasi ini terdiri dari dua bagian terpisah: **Frontend (React)** dan **Backend (Express)**. Keduanya perlu dijalankan bersamaan.

### A. Instalasi Dependencies

**1. Backend**

```bash
cd backend
npm install
```

**2. Frontend**

```bash
cd ..
cd latihan-frontend
npm install
```

### B. Menjalankan Aplikasi

Gunakan dua terminal berbeda:

**Terminal 1 – Backend**

```bash
cd backend
npm start
# Jalankan di http://localhost:5000
```

**Terminal 2 – Frontend**

```bash
cd latihan-frontend
npm start
# Terbuka otomatis di http://localhost:3000
```

### C. Alur Penggunaan

1. Buka `http://localhost:3000`.
2. Masuk ke halaman **Login**.
3. Klik **"Daftar di sini"** untuk membuat akun baru.
4. Setelah registrasi berhasil, Anda akan diarahkan kembali ke **Login**.
5. Login dengan akun yang telah dibuat.
6. Anda akan masuk ke **Dashboard**, di mana Anda bisa menambah, melihat, mengedit, dan menghapus data.

## 5. Struktur Project

```
Tugas_2_Front-End_Celerates/
├── backend/
│   ├── package.json               # Konfigurasi dan dependencies backend
│   ├── server.js                  # Entry point server Express
│   ├── data/
│   │   └── db.js                  # Database sementara (in-memory)
│   ├── middleware/
│   │   └── auth.js                # Middleware untuk verifikasi JWT
│   └── routes/
│       ├── auth.js                # Endpoint /api/auth (Register & Login)
│       └── items.js               # Endpoint /api/items (CRUD)
├── latihan-frontend/
│   ├── src/
│   │   ├── App.js                 # Komponen utama React (routing & layout dasar)
│   │   ├── index.js               # Entry point aplikasi React
│   │   ├── api/
│   │   │   └── api.js             # Konfigurasi Axios (baseURL: http://localhost:5000/api)
│   │   ├── components/
│   │   │   ├── FormModal.js       # Komponen modal untuk tambah/edit item
│   │   │   ├── Navbar.js          # Komponen navigasi utama
│   │   │   └── PrivateRoute.js    # Proteksi halaman privat (cek token)
│   │   └── pages/
│   │       ├── Dashboard.js       # Halaman utama (CRUD item)
│   │       ├── Login.js           # Halaman login pengguna
│   │       ├── NotFound.js        # Halaman 404 jika rute tidak ditemukan
│   │       └── Register.js        # Halaman registrasi pengguna baru
│   ├── public/                    # File publik dan index.html
│   ├── package-lock.json          # Lockfile dependencies frontend
│   └── package.json               # Konfigurasi dan dependencies frontend
└── README.md
```

## 6. Penyusun Proyek

- **Penyusun:** Muhammad Evan Althafy Marhian
