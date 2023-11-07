const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: true,
    paranoid: true,
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.document = require("./document.model.js")(sequelize, Sequelize);
// db.invoiceLine = require("./invoiceLine.model.js")(sequelize, Sequelize);
// db.taxLine = require("./taxLine.model.js")(sequelize, Sequelize);

// db.user = require("./user.model.js")(sequelize, Sequelize);
// db.company = require("./company.model.js")(sequelize, Sequelize);

// db.address = require("./address.model.js")(sequelize, Sequelize);

module.exports = db;
