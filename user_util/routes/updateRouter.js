const updateRouter = require("express").Router();
const uploader = require("../middleware/multer");
const cloudinaryUpload = require("../middleware/cloudinaryUpload");
const cloudinaryRemove = require("../controllers/cloudinaryRemove");
const coverMod = require("../middleware/modify/coverMod");
const dpMod = require("../middleware/modify/dpMod");
const chatBgMod = require("../middleware/modify/chatBgMod");

// http://localhost:8080/update/mod_dp
updateRouter
  .route("/mod_dp")
  .put(uploader.single("util_file"), cloudinaryUpload, dpMod, cloudinaryRemove);

// http://localhost:8080/update/mod_cover
updateRouter
  .route("/mod_cover")
  .put(
    uploader.single("util_file"),
    cloudinaryUpload,
    coverMod,
    cloudinaryRemove
  );

// http://localhost:8080/update/mod_chatbg
updateRouter
  .route("/mod_chatbg")
  .put(
    uploader.single("util_file"),
    cloudinaryUpload,
    chatBgMod,
    cloudinaryRemove
  );

module.exports = updateRouter;
