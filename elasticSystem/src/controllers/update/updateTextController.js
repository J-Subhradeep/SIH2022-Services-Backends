const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");
const _ = require("lodash");

const updateTextController = async (req, res, next) => {
  const changes = req.body;
  const { id } = req.body;
  delete changes["id"];
  if (_.isEmpty(changes) || !changes) {
    console.log("No updates mentioned request.");
    return res
      .status(400)
      .json({ message: "No updates mentioned request." });
  }

  log("credentials: ", id, changes);

  try {
    const resp = await client.update({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id: id,
      doc: {
        ...changes,
      },
    });
    log("returned doc:", resp);
    res.json({ response: resp });
  } catch (err) {
    log(err);
    res.json({ response: err });
  }
};
module.exports = updateTextController;
