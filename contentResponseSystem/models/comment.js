const mongoose = require("mongoose");

const unitCommentSchema = new mongoose.Schema({
  _id: String,
  body: {
    type: String,
    // required: true,
  },
  ownerId: {
    type: String,
    // required: true,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  _id: String,
  listComments: {
    type: [unitCommentSchema],
    default: [],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
