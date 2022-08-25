const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config.env"),
});
const client = require("../config/client");
const { log } = require("console");
const _ = require("lodash");
const isJSON = require("../utils/json");

const fetchByIdController = async (req, res) => {
  const { id = "" } = req.query;
  console.log("query: ", req.query);
  if (id == "") {
    console.log("no id found in req.query");
    return res.status(400).json({ message: "Missing id in request" });
  }
  // console.log(process.env.ELASTICSEARCH_INDEX_NAME, id);

  try {
    const resp = await client.get({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id,
    });

    console.log("Fetched  document from cloud: ", resp._source);
    res.json({ response: resp._source, result: "found", status: 200 });
  } catch (err) {
    if (err.message && isJSON(err.message)) {
      err.message = JSON.parse(err.message);
    }
    log("Error in fetching doc ES: ", /*err.name, ": ", err.message ||*/ err);
    const { message = {}, statusCode: err_code = 500 } = err;
    const { found = true } = message;
    if (!found) return res.status(404).json({ message: "Document not found" });
    res.status(err_code).json({ message: err.message || err });
  }
};
module.exports = fetchByIdController;
