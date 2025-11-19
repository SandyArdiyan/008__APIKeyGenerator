const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const ApiKey = sequelize.define("ApiKey", {
  api_key: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiry_date: { type: DataTypes.DATE, allowNull: true }
});

User.hasMany(ApiKey, { foreignKey: "user_id", onDelete: "CASCADE" });
ApiKey.belongsTo(User, { foreignKey: "user_id" });

module.exports = ApiKey;
