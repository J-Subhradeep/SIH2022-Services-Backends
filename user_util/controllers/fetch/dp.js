const Dp = require("../../models/dpModel");
const _ = require("lodash");

const dp = async (req, res, next) => {
  const { user = "" } = req.query;
  console.log(req.query);
  if (user == "") {
    console.log("Invalid/missing id from client");
    return res.status(400).json({ message: "Invalid/missing id from client" });
  }

  try {
    const pic = await Dp.findById(user);
    if (!user || _.isEmpty(pic)) {
      console.log("Document not found");
      return res.status(404).json({ message: "Document not found" });
    }
    console.log(pic);
    res.send(pic);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.name + ": " + error.message });
  }
};
module.exports = dp;
