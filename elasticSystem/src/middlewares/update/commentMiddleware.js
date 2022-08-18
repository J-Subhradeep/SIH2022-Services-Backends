const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const axios = require("axios");
const _ = require("lodash");

const commentMiddleware = async (req, res, next) => {
  const { c_id = "", owner_id = "", text = "" } = req.body;
  // console.log(_.isBoolean(action));
  if (!c_id || !owner_id || !text) {
    console.log("Missing content id or owner_id or action");
    return res
      .status(400)
      .json({ message: "Missing content id or owner id or action" });
  }
  try {
    const hasCommented = await axios.get(process.env.HAS_COMMENTED_URL, {
      params: {
        c_id,
        owner_id,
      },
    });
    // console.log("what", hasCommented);
    req.midval = {
      c_id,
      owner_id,
      text,
      commented: hasCommented.data.commented,
    };
    console.log("mid values:", req.midval);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  next();
};
module.exports = commentMiddleware;
