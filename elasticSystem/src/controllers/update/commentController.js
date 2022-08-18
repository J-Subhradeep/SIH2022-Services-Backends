const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const { default: axios } = require("axios");
const client = require("../../config/client");

const commentController = async (req, res) => {
  const { c_id = "", owner_id = "", body = "" } = req.body;
  if (!c_id || !owner_id || !body)
    return res.status(400).json({ message: "Invalid or missing inputs." });
  try {
    const commenting = await axios.patch(process.env.COMMENT_URL, {
      postId: c_id,
      ownerId: owner_id,
      body,
    });
    const incrementCommentCount = await client.update({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      id: c_id,
      script: {
        lang: "painless",
        source: "ctx._source.comment_count++",
      },
    });
    res.send({ mongo: commenting.data, elastic: incrementCommentCount });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = commentController;
