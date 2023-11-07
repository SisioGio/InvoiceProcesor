const config = require("../config/auth.config");
const db = require("../models");

const Document = db.document;

exports.findAll = async (req, res) => {
  const output = await Document.findAll();

  return res.send(output);
};

exports.create = async (req, res) => {
  try {
    const requestData = req.body;

    const docObj = await Document.create(requestData);

    return res.send(docObj);
  } catch (err) {
    console.log(err);
  }
};
