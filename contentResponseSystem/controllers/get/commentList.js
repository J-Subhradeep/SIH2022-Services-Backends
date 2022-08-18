const Comment = require("../../models/comment");

const commentList = async(req, res) => {
  const { c_id = "" } = req.query;
  if (!c_id) return res.status(400).json({ message: "Invalid id" });
  try {
    const listC = await Comment.findById(c_id);
    if(!listC) return res.json({ message: "Post not found" });  
    res.json({ comments:listC.listComments });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = commentList;
