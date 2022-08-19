const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const axios = require("axios");

const unShareController = async (req, res) => {
  const { postId = "", ownerId = "" } = req;
  try {
    const misc = await axios.patch(process.env.SHARE_FIX_URL, {
      postId,
      ownerId,
    });
    console.log(misc.data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = unShareController;
