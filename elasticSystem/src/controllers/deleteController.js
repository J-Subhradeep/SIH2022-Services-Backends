const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config.env"),
});
const client = require("../config/client");
const { log } = require("console");
const axios = require("axios");
const _ = require("lodash");

const deleteController = async (req, res, next) => {
  
  console.log("Inputs in deleteController[elastic]: ", req.media_deleted);
  const id = req.user || req.query.id || "";
  console.log("Entry id: ", id);

  if (!id || id == "") {
    console.log("No entry id found. Unable to delete entry.");
    return res.status(400).json({ message: "No entry id found." });
  }

  // Deleting the post from ElasticSearch
  try {
    const resp = await client.delete({
      index: process.env.ELASTICSEARCH_INDEX,
      id,
    });
    log("returned doc:", resp);
    res.json({ response: resp, media_deleted: req.media_deleted });
  } catch (err) {
    log(
      "Error in delete post from elastic: ",
      err.name + ": " + err.message || err
    );
    res.json({ message: err.message, response: err });
  }
};

module.exports = deleteController;
