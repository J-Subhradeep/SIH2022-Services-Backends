const Comment = require("../models/comment");

const editCommentController = async (req, res) => {
  const { postId = "", commentId = "", body = "" } = req.body;
  let found = false;
  try {
    const foundList = await Comment.findById(postId);
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
    const newDoc = await Comment.findById(postId);
    console.log(newDoc);
    res.send({ edited: true, newdoc: newDoc });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = editCommentController;
