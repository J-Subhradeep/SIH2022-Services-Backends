const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  _id: String,
  listLikes: {
    type: [String],
    default: [],
  },
});

const Like = mongoose.model("Like", LikeSchema);

LikeSchema.methods.check = function (user) {
  return this.listLikes.includes(user);
};

module.exports = Like;
