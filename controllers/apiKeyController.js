const { v4: uuidv4 } = require("uuid");
const ApiKey = require("../models/ApiKey");
const User = require("../models/User");

exports.generateKey = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId wajib diisi" });

    const key = uuidv4();
    
    // Hitung tanggal 30 hari ke depan
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 30);

    const apiKey = await ApiKey.create({
      api_key: key,
      expiry_date: expiredDate, // Nama kolom harus sama persis dengan Model
      user_id: userId
    });

    res.json({ message: "API Key generated", apiKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllKeys = async (req, res) => {
  try {
    const keys = await ApiKey.findAll({ include: User });
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKeyById = async (req, res) => {
  try {
    const { id } = req.params;
    const key = await ApiKey.findByPk(id, { include: User });
    
    if (!key) return res.status(404).json({ message: "API Key tidak ditemukan" });
    
    res.json(key);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};