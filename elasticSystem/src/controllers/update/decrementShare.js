const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const { default: axios } = require("axios");
const client = require("../../config/client");

const decrementShares = async (req, res) => {
  const { c_id = "" } = req.body;
  if (!c_id) return res.status(400).send({ message: "Share already exists" });

  try {
    const decrementShareCount = await client.update({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id: c_id,
      script: {
        lang: "painless",
        source: "ctx._source.share_count--",
      },
    });
    if (decrementShareCount) return res.send({ decremented: true });
    res.send({ decremented: false });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = decrementShares;
