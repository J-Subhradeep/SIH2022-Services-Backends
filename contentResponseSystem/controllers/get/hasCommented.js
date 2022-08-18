const Comment = require("../../models/comment");

const hasCommented = async (req, res) => {
  const { c_id = "", owner_id = "" } = req.query;
  if (!c_id || !owner_id) {
    console.log("Missing content id or owner_id");
    return res.status(400).json({ message: "Missing content id or owner id" });
  }
  // console.log(req.query);
  try {
    const gotPost = await Comment.findById(c_id);
    console.log(gotPost);
    if (gotPost) {
      const isPresent = gotPost.listComments.some(
        (commenter) => commenter.ownerId === owner_id
      );
      res.send({ commented: isPresent });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};
module.exports = hasCommented;
