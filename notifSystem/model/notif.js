const mongoose = require("mongoose");

const notifElementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const notifSchema = new mongoose.Schema({
  _id: String,
  notifications: {
    type: [notifElementSchema],
    default: [],
  },
  total_count: Number,
  count_unseen: Number,
});

const Notif = mongoose.model("Notification", notifSchema);

module.exports = Notif;
