const mongoose = require("mongoose");

const dp_Schema = new mongoose.Schema(
  {
    _id: String,
    file: String,
    url: String,
  }
  //   { _id: false }
);

const Dp = mongoose.model("display_picture", dp_Schema);

module.exports = Dp;