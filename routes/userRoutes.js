// userRoutes.js
const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const auth = require("../middleware/auth"); // <-- TAMBAHKAN: Impor middleware

router.get("/", user.getUsers); // <-- TAMBAHKAN: Lindungi rute ini
router.post("/", user.createUser); // <-- TAMBAHKAN: Lindungi rute ini juga

module.exports = router;