const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config.env"),
});
const client = require("../config/client");
const { log } = require("console");

const updateController = async (req, res, next) => {
  const { id, changes } = req.body;
  log(id, changes);
  try {
    const resp = await client.update({
      index: process.env.ELASTICSEARCH_INDEX,
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
module.exports = updateController;
