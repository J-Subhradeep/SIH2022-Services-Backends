const mongoose = require("mongoose");

const profileViewSchema = new mongoose.Schema({
  _id: String,
  profileVIews: {
    type: [String],
    default: [],
  },
});

const ProfileView = mongoose.model("ProfileView", profileViewSchema);

module.exports = ProfileView;
