const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const { default: axios } = require("axios");
const client = require("../config/client");

const delCommentController = async (req, res) => {
  const { c_id = "" } = req.body;

  try {
    const decrementCommentCount = await client.update({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id: c_id,
      script: {
        lang: "painless",
        source: "ctx._source.comment_count--",
      },
    });
    res.send({ uncommented: true, response: decrementCommentCount });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = delCommentController;
