const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const { default: axios } = require("axios");

const delCommentMiddleware = async (req, res, next) => {
  const { c_id = "", comment_id = "" } = req.body;
  if (!c_id || !comment_id)
    return res.status(400).send({ message: "Invalid credentials" });

  try {
    const delCmResp = await axios.patch(process.env.DEL_COMM, {
      postId: c_id,
      commentId: comment_id,
    });
    const { uncommented } = delCmResp.data;
    if (uncommented === true) {
      next();
      return;
    }
    res.send(delCmResp.data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  //   next();
};
module.exports = delCommentMiddleware;
