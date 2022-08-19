const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config.env"),
});
const client = require("../config/client");
const { log } = require("console");
const _ = require("lodash");
const isJSON = require("../utils/json");

const fetchController = async (req, res, next) => {
  const { id = "" } = req.query;
  console.log("query: ", req.query);
  if (id == "") {
    console.log("no id found in req.query");
    return res.status(400).json({ message: "Missing id in request" });
  }
  // console.log(process.env.ELASTICSEARCH_INDEX_NAME, id);

  try {
    // const resp = await client.get({
    //   index: process.env.ELASTICSEARCH_INDEX_NAME,
    //   owner_id: id,
    // });
    const resp = await client.search({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      query: {
        match: {
          owner_id: id,
        },
      },
      sort: [{ time: { order: "desc" } }],
    });
    // const resp = await client.search({
    //   index: process.env.ELASTICSEARCH_INDEX_NAME,
    //   query: {
    //     bool: {
    //       must: [{ match: { owner_id: id } }],
    //     },
    //   },
    // });
    console.log("Fetched  document from cloud: ", resp.hits);
    res.json({ response: resp.hits.hits, result: "found", status: 200 });
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
module.exports = fetchController;
