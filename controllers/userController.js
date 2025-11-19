// controllers/userController.js

const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username wajib diisi" });
    }

    // Logika API Key dipindahkan ke apiKeyController
    const user = await User.create({
      username
    });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};