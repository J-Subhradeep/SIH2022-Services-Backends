const Comment = require("../../models/comment");

const commentInit = async (req, res, next) => {
  const intiCmm = new Comment({ _id: req.id });
  try {
    const cmmRes = await intiCmm.save();
    console.log(cmmRes);
    // req.setup.comment = [true, cmmRes];
    req.setup.comment = true;
  } catch (error) {
    console.log("error: ", error.message);
    res.send(error);
  }
  next();
};
module.exports = commentInit;
