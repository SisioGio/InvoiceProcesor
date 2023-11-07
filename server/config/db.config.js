module.exports = {
  HOST: "127.0.0.1",
  port: "3306",
  USER: "root",
  PASSWORD: "Pesca123!",
  DB: "InvoiceProcessor",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
