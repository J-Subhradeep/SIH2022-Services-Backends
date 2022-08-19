const Share = require("../../models/share");

const unShare = async (req, res) => {
  const { postId = "", ownerId = "" } = req.body;
  if (!postId || !ownerId)
    return res.status(400).send({ message: "Invalid credentials" });

  try {
    const foundDoc = await Share.findById(postId);
    if (!foundDoc) return res.send({ message: "Post not found" });
    const isFound = foundDoc.listShares.some(
      (share) => share.shared_by == ownerId
    );

    if (isFound) {
      console.log("un sharing post");
      const decShared = await axios.patch(process.env.DECR_SHARE_URL, {
        c_id: postId,
      });
      if (decShared.data.decremented) {
        console.log("decremented comment count in og post");
      }
      foundDoc.listShares = foundDoc.listShares.filter(
        (share) => share.shared_by != ownerId
      );
      const newdoc = await foundDoc.save();
      const found = newdoc.listShares.some(
        (share) => share.shared_by == ownerId
      );
      console.log(found);
      return res.send({ unshared: found });
    }
    return res.send({ unshared: "Not shared yet" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = unShare;
