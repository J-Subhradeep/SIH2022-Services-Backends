const Share = require("../../models/share");

const hasShared = async (req, res) => {
  const { c_id = "", owner_id = "" } = req.query;
  if (!c_id || !owner_id) {
    console.log("Missing content id or owner_id");
    return res.status(400).json({ message: "Missing content id or owner id" });
  }

  try {
    const gotPost = await Share.findById(c_id);
    console.log(gotPost);
    if (gotPost) {
      const isPresent = gotPost.listShares.some(
        (sharedUnit) => sharedUnit.shared_by === owner_id
      );
      res.send({ shared: isPresent });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};
module.exports = hasShared;
