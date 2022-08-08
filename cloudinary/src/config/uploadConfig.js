const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });

const defaultPost = {
  like_count: 0,
  comment_count: 0,
  share_count: 0,
  is_shared: false,
  is_public: true,
  share_owner: "",
  is_group_post: false,
};

const uploadOptions = {
  upload_preset: process.env.UPLOAD_PRESET,
  resource_type: "video",
  chunk_size: 6000000,
};

module.exports = { defaultPost, uploadOptions };
