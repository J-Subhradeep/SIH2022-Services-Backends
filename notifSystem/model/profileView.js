const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  _id: String,
  profileVIews: {
    type: [String],
    default: [],
  },
});

const Notif = mongoose.model("Notification", notifSchema);

module.exports = Notif;
