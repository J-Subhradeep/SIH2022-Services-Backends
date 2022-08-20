const mongoose = require("mongoose");

const sharedPostSchema = new mongoose.Schema(
  {
    shared_by: String,
    shared_post: String,
  },
  { _id: false }
);

const ShareSchema = new mongoose.Schema({
  _id: String,
  listShares: {
    type: [sharedPostSchema],
    default: [],
  },
});

const Share = mongoose.model("Share", ShareSchema);

module.exports = Share;
