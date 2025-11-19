const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, DataTypes);
db.Admin = require("./Admin")(sequelize, DataTypes);
db.ApiKey = require("./ApiKey")(sequelize, DataTypes);

// Relasi
db.User.hasMany(db.ApiKey, { foreignKey: "user_id" });
db.ApiKey.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
