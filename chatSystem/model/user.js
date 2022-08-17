const mongoose = require("mongoose");
const { Schema } = mongoose;

const friendSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  lastMsgTime: {
    type: String,
  },
});

const groupSchema = new Schema({
  _id: {
    type: String,
  },
});

const userSchema = new Schema({
  _id: String,
  friends: {
    type: [friendSchema],
    default: () => [],
  },
  groups: {
    type: [groupSchema],
    default: () => [],
  },
});

const User = mongoose.model("User", userSchema);
// const Friend = mongoose.model("Friend", friendSchema);

module.exports = { User };
