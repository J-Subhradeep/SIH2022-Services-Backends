const updateRouter = require("express").Router();
const uploader = require("../middleware/multer");
const cloudinaryUpload = require("../middleware/cloudinaryUpload");
const cloudinaryRemove = require("../controllers/cloudinaryRemove");
const coverMod = require("../middleware/modify/coverMod");
const dpMod = require("../middleware/modify/dpMod");
const chatBgMod = require("../middleware/modify/chatBgMod");

// http://localhost:8080/upload/upload_dp
updateRouter.route("/upload_dp").put(cloudinaryUpload, dpMod, cloudinaryRemove);

// http://localhost:8080/upload/upload_cover
updateRouter.route("/upload_cover").put(
	// uploader.single("util_file"),
	cloudinaryUpload,
	coverMod,
	cloudinaryRemove
);

// http://localhost:8080/upload/upload_chatbg
updateRouter.route("/upload_chatbg").put(
	// uploader.single("util_file"),
	cloudinaryUpload,
	chatBgMod,
	cloudinaryRemove
);

module.exports = updateRouter;
