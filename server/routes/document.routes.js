module.exports = (app) => {
  const document = require("../controllers/document.controller.js");

  var router = require("express").Router();

  router.get("/", document.findAll);
  router.post("/", document.create);

  app.use("/api/document", router);
};
