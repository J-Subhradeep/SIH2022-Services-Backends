const Comment = require("../../models/comment");
const _ = require("lodash");

const unComment = async (req, res) => {
  const { postId = "", commentId = "" } = req.body;
  try {
    const foundList = await Comment.findById(postId);

    const newList = foundList.listComments.filter(
      (comment) => comment._id != commentId
    );
    if (_.isEqual(newList, foundList.listComments)) {
      console.log("Comment not found");
      return res.send({ Error: "Comment not found;" });
    }
    foundList.listComments = newList;
    await foundList.save();
    console.log("deleted comment");
    res.send(foundList);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = unComment;
