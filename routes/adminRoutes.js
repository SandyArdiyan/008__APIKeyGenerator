// adminRoutes.js
const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const auth = require("../middleware/auth"); // <-- GANTI: Impor middleware yang benar

// HAPUS FUNGSI AUTH LOKAL DARI SINI

router.post("/register", admin.register);
router.post("/login", admin.login);
router.get("/dashboard", auth, admin.dashboard); // <-- Gunakan middleware yang diimpor

module.exports = router;