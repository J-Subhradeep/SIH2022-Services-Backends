const Share = require("../../models/share");

const shareInit = async (req, res, next) => {
  console.log(req.body);
  const { c_id = "" } = req.body;
  if (!c_id) {
    console.log("Missing content id in request");
    return res.status(400).json({
      message: "Missing content id in request",
    });
  }
  req.id = c_id;
  req.setup = {};

  const initSh = new Share({ _id: req.id });
  try {
    const shrRes = await initSh.save();
    console.log(shrRes);
    // req.setup.share = [true, shrRes];
    req.setup.share = true;
  } catch (error) {
    console.log("error: ", error.message);
    res.send(error);
  }
  next();
};

module.exports = shareInit;
