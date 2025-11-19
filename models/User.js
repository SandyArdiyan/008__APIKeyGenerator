const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  api_key: { type: DataTypes.STRING, allowNull: true }
});

module.exports = User;
