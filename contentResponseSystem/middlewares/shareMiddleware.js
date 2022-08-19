const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.js") });
const axios = require("axios");

const shareMiddleware = async (req, res, next) => {
  const { c_id = "", owner_id = "" } = req.body;
  if (!c_id || !owner_id)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const sharedResp = await axios.get(process.env.HAS_SHARED_URL, {
      params: { c_id, owner_id },
    });
    req.shared = sharedResp.data.shared;
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  next();
};
module.exports = shareMiddleware;
