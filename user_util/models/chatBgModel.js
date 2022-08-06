const mongoose = require("mongoose");

const chatBg_Schema = new mongoose.Schema({
  _id: String,
  file: String,
  url: String,
});

const ChatBg = mongoose.model("chat_bg_picture", chatBg_Schema);

module.exports = ChatBg;
