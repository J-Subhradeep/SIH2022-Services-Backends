const mongoose = require("mongoose");

const cover_Schema = new mongoose.Schema({
  _id: String,
  file: String,
  url: String,
});

const Cover = mongoose.model("cover_picture", cover_Schema);

module.exports = Cover;
