const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const postShareMiddleware = async (req, res) => {
  if (req.shared)
    return res.status(400).send({ message: "Share already exists" });

  const all = req.body;
  try {
    const sharing = await axios.post(process.env.CLOUDI_UPLOAD, {
      ...all,
    });
    req.shared_from_post_id = sharing.data.response.post_sys._id;
    req.og_id = all.shared_from;
    next();
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = postShareMiddleware;
