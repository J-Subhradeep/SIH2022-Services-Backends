const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema(
  {
    owner_id: String,
    time: String,
  },
  { _id: false }
);

const profileViewSchema = new mongoose.Schema({
  _id: String,
  profileViews: {
    type: [viewSchema],
    default: [],
  },
});

const ProfileView = mongoose.model("ProfileView", profileViewSchema);

module.exports = ProfileView;
