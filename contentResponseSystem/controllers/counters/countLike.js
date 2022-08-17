const Like = require("../../models/like");

const countLike = async (req, res) => {
  const { id = "" } = req.query;
  if (!id) {
    console.log("Missing id in request");
    return res.status(400).json({
      message: "Missing id in request",
    });
  }
  console.log(req.query);
  try {
    const likeDoc = await Like.findById(id).exec();
    const lcount = likeDoc.listLikes.length;
    console.log({ likeDoc, lcount });
    res.json({ likes: lcount });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { countLike };
