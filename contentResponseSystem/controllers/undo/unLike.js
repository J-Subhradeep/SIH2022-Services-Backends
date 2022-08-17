const Like = require("../../models/like");

const unLike = async (req, res) => {
  const { postId = "", ownerId = "" } = req.body;
  try {
    const foundDoc = await Like.findById(postId);
    if (foundDoc.listLikes.includes(ownerId)) {
      console.log("un - Liking post");
      foundDoc.listLikes = foundDoc.listLikes.filter((like) => like != ownerId);
      await foundDoc.save();
      console.log(!foundDoc.listLikes.includes(ownerId));
      return res.send({ "un-liked": !foundDoc.listLikes.includes(ownerId) });
    }
    return res.send({ Error: "Not liked yet" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = unLike;
