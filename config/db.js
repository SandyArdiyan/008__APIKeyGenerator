const { Sequelize } = require('sequelize');
const config = require('../config');
// Ambil pengaturan DB dari file config
const dbConfig = config.db;

const sequelize = new Sequelize(
  dbConfig.database, // "db_api_keys"
  dbConfig.user,     // "root"
  dbConfig.password, // Password kamu (Ikan12!)
  {
    host: dbConfig.host,   // "127.0.0.1"
    port: dbConfig.port,   // 3307
    dialect: 'mysql',      // Kita pakai MySQL
    logging: console.log   // Tampilkan query SQL di console (bisa di-set false nanti)
  }
);

// Ekspor koneksi sequelize-nya
module.exports = sequelize;