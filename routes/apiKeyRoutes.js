// apiKeyRoutes.js
const express = require("express");
const router = express.Router();
const apiKeyController = require("../controllers/apiKeyController");
const auth = require("../middleware/auth"); // <-- TAMBAHKAN: Impor middleware

// GET semua API key
router.get("/", auth, apiKeyController.getAllKeys); // <-- TAMBAHKAN: Lindungi rute ini

// Generate API key baru
router.post("/generate", auth, apiKeyController.generateKey); // <-- TAMBAHKAN: Lindungi rute ini

module.exports = router;