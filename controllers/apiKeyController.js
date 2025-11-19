const { v4: uuidv4 } = require("uuid");
const ApiKey = require("../models/ApiKey");
const User = require("../models/User");

exports.generateKey = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: "userId wajib diisi" });

    const key = uuidv4();
    
    // Hitung tanggal 30 hari dari sekarang
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const apiKey = await ApiKey.create({
      api_key: key,
      // 👇 PASTIKAN BARIS INI ADA DAN EJAANNYA BENAR 'expiry_date' (pake underscore)
      expiry_date: thirtyDaysFromNow, 
      user_id: userId
    });

    res.json({
      message: "API Key berhasil dibuat",
      apiKey
    });

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