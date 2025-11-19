const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  }
  // Kolom 'api_key' sudah DIHAPUS dari sini supaya tidak muncul null lagi
});

module.exports = User;