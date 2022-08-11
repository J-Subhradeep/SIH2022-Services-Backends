const fileRouter = require("express").Router();
const postDp = require("../controllers/post/postDp");
const postChatBg = require("../controllers/post/postChatBg");
const postCover = require("../controllers/post/postCover");
const uploader = require("../middleware/multer");
const cloudinaryUpload = require("../middleware/cloudinaryUpload");

// http://localhost:8080/upload/upload_dp
fileRouter
  .route("/upload_dp")
  .post(cloudinaryUpload, postDp);

// http://localhost:8080/upload/upload_cover
fileRouter
.route("/upload_cover")
.post(uploader.single("util_file"), cloudinaryUpload, postCover);

// http://localhost:8080/upload/upload_chatbg
fileRouter
  .route("/upload_chatbg")
  .post(uploader.single("util_file"), cloudinaryUpload, postChatBg);

module.exports = fileRouter;
