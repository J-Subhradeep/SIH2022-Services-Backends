const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
  _id: String,
  listShares: {
    type: [String],
    default: [],
  },
});

const Share = mongoose.model("Share", ShareSchema);

module.exports = Share;
