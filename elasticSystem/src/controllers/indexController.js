const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config.env"),
});
const client = require("../config/client");
const { getTime } = require("../utils/time");
const { log } = require("console");

const indexController = async (req, res, next) => {
  let { doc } = req.body;
  const id = doc["id"];
  const time = getTime();
  const newDoc = { ...doc, time };
  console.log("input for upload to elastic index: ", newDoc);

  try {
    const resp = await client.index({
      index: process.env.ELASTICSEARCH_INDEX_NAME, // contents index
      id,
      body: {
        ...newDoc,
      },
      refresh:true,
    });
    console.log(" indexed doc: ", resp);
    res.json({ response: resp });
  } catch (err) {
    err.meta.body = err.meta.body || {};
    console.log(err.message, err.meta.body);
    res.json({ message: err.message, response: err });
  }
};
module.exports = indexController;
