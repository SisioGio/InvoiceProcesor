const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

const { DB } = require("./config/db.config");

// Company Code - Vendor
db.companyCode.hasMany(db.vendor);
db.vendor.belongsTo(db.companyCode);

// Company Code - Documents

db.companyCode.hasMany(db.document);
db.document.belongsTo(db.companyCode);

// Vendor - Documents

db.vendor.hasMany(db.document);
db.document.belongsTo(db.vendor);

// Document - Line-items

db.document.hasMany(db.lineItem);
db.lineItem.belongsTo(db.document);

//  Vendor - Order Items
db.vendor.hasMany(db.orderItem);
db.orderItem.belongsTo(db.vendor);

// Line Item - Order Item

db.orderItem.hasOne(db.lineItem);
db.lineItem.belongsTo(db.orderItem);

db.sequelize
  .authenticate({ force: true })
  .then(async () => {
    // Initialize db
    const init = require("./initializeDb");
    init.init(db);
    console.log("Sync completed");
  })
  .catch((err) => {
    console.log("Sync failed - " + err.message ? err.message : null);
  });

app.get("/test", (req, res) => {
  res.json({ message: "Welcome" });
});

// Routes

require("./routes/document.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
