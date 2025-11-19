const crypto = require("crypto");
const ApiKey = require("../models/ApiKey");
const User = require("../models/User");

// GET semua API key (include user info)
exports.getAllKeys = async (req, res) => {
  try {
    const keys = await ApiKey.findAll({ include: [{ model: User }] });
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate API key baru. Expected body: { userId, expiryDays }
exports.generateKey = async (req, res) => {
  try {
    const { userId, expiryDays } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const apiKeyValue = crypto.randomBytes(32).toString("hex");

    let expiry_date = null;
    if (expiryDays && Number(expiryDays) > 0) {
      expiry_date = new Date(Date.now() + Number(expiryDays) * 24 * 60 * 60 * 1000);
    }

    const apiKey = await ApiKey.create({
      api_key: apiKeyValue,
      expiry_date,
      user_id: userId
    });

    res.json({ message: "API key generated", apiKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};