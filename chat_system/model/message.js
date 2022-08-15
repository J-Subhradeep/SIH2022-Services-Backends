const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const fileSchema = new Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  type: {
    type: String,
  },
  ogname: {
    type: String,
  },
});

const messageSchema = new Schema({
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  inGroup: {
    type: Boolean,
  },
  message: {
    type: String,
  },
  isFile: {
    type: Boolean,
  },
  hasParent: {
    type: Boolean,
  },
  parent: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: fileSchema,
  },
});

const Message = model("Message", messageSchema);
module.exports = Message;
