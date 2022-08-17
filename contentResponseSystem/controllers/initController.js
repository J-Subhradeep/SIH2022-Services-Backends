const Like = require("../models/like");

const initController = async (req, res) => {
  const initLike = new Like({ _id: req.id });
  try {
    const initResult = await initLike.save();
    console.log(initResult);
    // req.setup.likes = [true, initResult];
    req.setup.likes = true;
    console.log("init status ", req.setup);
    res.send(req.setup);
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
};

module.exports = initController;
