const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  _id: String,
  notifications: {
    type: [String],
    default: [],
  },
  total_count: Number,
  count_unseen: Number,
});

const Notif = mongoose.model("Notification", notifSchema);

module.exports = Notif;
