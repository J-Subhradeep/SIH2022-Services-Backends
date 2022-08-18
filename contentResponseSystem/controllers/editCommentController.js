const Comment = require("../models/comment");

const editCommentController = async (req, res) => {
  const { c_id = "", commentId = "", body = "" } = req.body;
  let found = false;
  try {
    const foundList = await Comment.findById(c_id);
    if (!foundList) {
      return res.json({ message: "Post not found" });
    }
    foundList.listComments = foundList.listComments.map((comment) => {
      if (comment._id == commentId) {
        comment.body = body;
        comment.isEdited = true;
        found = true;
      }
      return comment;
    });
    if (!found) {
      console.log("Comment not found");
      return res.send({ Error: "Comment not found;" });
    }
    await foundList.save();
    const newDoc = await Comment.findById(c_id);
    console.log(newDoc);
    res.send({ edited: true, newdoc: newDoc });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = editCommentController;
