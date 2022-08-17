const Comment = require("../../models/comment");
const crypto = require("crypto");

const addCommentController = async (req, res) => {
  const { postId = "", ownerId = "", body = "" } = req.body;
  const id = crypto.randomUUID();
  try {
    const foundDoc = await Comment.findByIdAndUpdate(
      postId,
      {
        $push: {
          listComments: {
            _id: id,
            body,
            ownerId,
          },
        },
      },
      { new: true }
    );
    console.log("doc: ", foundDoc);
    res.send({ commented: true });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = addCommentController;
