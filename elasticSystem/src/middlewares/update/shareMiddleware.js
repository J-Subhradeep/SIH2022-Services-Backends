const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const axios = require("axios");
const _ = require("lodash");

//  CHANGE THIS

const shareMiddleware = async (req, res, next) => {
  const { c_id = "", owner_id = "", action } = req.body;
  // console.log(_.isBoolean(action));
  if (!c_id || !owner_id || !_.isBoolean(action)) {
    console.log("Missing content id or owner_id or action");
    return res
      .status(400)
      .json({ message: "Missing content id or owner id or action" });
  }
  try {
    const hasLiked = await axios.get(process.env.HAS_LIKED_URL, {
      params: {
        c_id,
        owner_id,
      },
    });
    console.log("what", hasLiked);
    req.midval = { c_id, owner_id, action, liked: hasLiked.data.liked };
    console.log("mid values:", req.midval);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  next();
};
module.exports = shareMiddleware;
