const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const { default: axios } = require("axios");
const client = require("../../config/client");

const likeController = async (req, res) => {
  const { c_id, owner_id, action, liked } = req.midval;
  try {
    if (liked == action) {
      console.log(
        "Error in liking or unliking post. Actions and credentials mismatch",
        liked,
        action
      );
      return res.status(400).json({
        message: "action: " + action + ", liked: " + liked,
      });
    } else if (!liked && action) {
      console.log("Liking");
      const liking = await axios.patch(process.env.ADD_LIKE, {
        postId: c_id,
        ownerId: owner_id,
      });
      const incrementLikeCount = await client.update({
        index: process.env.ELASTICSEARCH_INDEX_NAME,
        id: c_id,
        script: {
          lang: "painless",
          source: "ctx._source.like_count++",
        },
      });
      console.log("results:", liking.data, incrementLikeCount);
      res.send({ mongo: liking.data, elastic: incrementLikeCount });
    } else if (liked && !action) {
      console.log("removing like");
      const removingLike = await axios.patch(process.env.REM_LIKE, {
        postId: c_id,
        ownerId: owner_id,
      });
      const decrementLikeCount = await client.update({
        index: process.env.ELASTICSEARCH_INDEX_NAME,
        id: c_id,
        script: {
          lang: "painless",
          source: "ctx._source.like_count--",
        },
      });
      res.send({ mongo: removingLike.data, elastic: decrementLikeCount });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = likeController;
