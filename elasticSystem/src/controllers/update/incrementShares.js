const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const { default: axios } = require("axios");
const client = require("../../config/client");

const incrementShares = async (req, res) => {
  const { c_id = "" } = req.body;
  if (!c_id) return res.status(400).send({ message: "Share already exists" });

  try {
    const incrementShareCount = await client.update({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id: c_id,
      script: {
        lang: "painless",
        source: "ctx._source.share_count++",
      },
    });
    if (incrementShareCount) return res.send({ incremented: true });
    res.send({ incremented: false });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = incrementShares;
