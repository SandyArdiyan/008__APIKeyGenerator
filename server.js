const express = require('express');
const sequelize = require('./config/db'); // Koneksi database kamu

// --- Impor Model untuk Relasi ---
// Ini penting agar Sequelize tahu relasinya sebelum sync
const User = require('./models/User');
const ApiKey = require('./models/ApiKey');
const Admin = require('./models/Admin');

// --- Impor Rute ---
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');

// --- Inisialisasi Aplikasi ---
const app = express();
app.use(express.json()); // Middleware wajib untuk membaca req.body JSON

// --- Definisikan Relasi (PENTING) ---
// Pastikan relasi one-to-many sudah benar
User.hasMany(ApiKey, { foreignKey: "user_id", onDelete: "CASCADE" });
ApiKey.belongsTo(User, { foreignKey: "user_id" });

// --- Gunakan Rute ---
app.use('/api/admin', adminRoutes);   // Rute: /api/admin/login, /api/admin/register, dll
app.use('/api/users', userRoutes);   // Rute: /api/users/
app.use('/api/keys', apiKeyRoutes);   // Rute: /api/keys/generate, dll

// --- Jalankan Server ---
const PORT = 3000; // atau port dari config kamu

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database (MySQL di port 3307) berhasil.');

    // alter: true akan update tabel jika model berubah.
    // Hati-hati gunakan ini di produksi.
    await sequelize.sync({ alter: true });
    console.log('Semua model berhasil disinkronkan.');

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
  }
}

startServer();