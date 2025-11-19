const express = require("express");
const router = express.Router();
// Pastikan nama file di require sesuai dengan nama file asli (apiKeyController.js)
const apiKeyController = require("../controllers/apiKeyController");
const auth = require("../middleware/auth");

router.get("/", auth, apiKeyController.getAllKeys);
router.get("/:id", auth, apiKeyController.getKeyById); // Fitur baru ambil per ID
router.post("/generate", auth, apiKeyController.generateKey);

module.exports = router;