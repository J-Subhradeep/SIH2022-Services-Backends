const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const Share = require("../../models/share");

const addShareController = async (req, res) => {
  const { c_id = "", owner_id = "" } = req.body;
  const shared_post = req.shared_from_post_id;
  const og = req.og_id;

  const incr = await axios.patch(process.env.INCR_SHARE_URL, {
    c_id: og,
  });

  if (!shared_post)
    return res
      .status(500)
      .send({ message: "Error in posting the shared post" });

  try {
    const foundDoc = await Share.findById(c_id);
    const isFound = foundDoc.listShares.some(
      (share) => share.shared_by == owner_id
    );

    if (!isFound) {
      console.log("Sharing post");
      let obj = { shared_by: owner_id, shared_post };
      foundDoc.listShares.push(obj);
      const newdoc = await foundDoc.save();
      const found = newdoc.listShares.some(
        (share) => share.shared_by == owner_id
      );
      console.log(found);
      return res.send({ shared: found, in_og: incr.data });
    }
    return res.send({ shared: "Already shared" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = addShareController;
