const uploadRouter = require("express").Router();
const upload = require("../middleware/multer");
const uploadToElasticController = require("../controller/uploadToElasticController");
const forElasticCloudinaryUploader = require("../middleware/forElasticCloudinaryUploader");
const contentSetter = require("../middleware/contentSetter");
const cloudinaryUploadController = require("../controller/cloudinaryUploadController");

uploadRouter
  .route("/")
  .post(
    // upload.array("post_file"),
    forElasticCloudinaryUploader,
    contentSetter,
    uploadToElasticController
  );

uploadRouter.route("/direct").post(cloudinaryUploadController);

module.exports = uploadRouter;
