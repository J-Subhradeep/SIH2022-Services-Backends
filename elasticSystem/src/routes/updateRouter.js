const updateRouter = require("express").Router();
const updateTextController = require("../controllers/update/updateTextController");
const likeMiddleware = require("../middlewares/update/likeMiddleware");

// for title and desc
updateRouter.route("/text").patch(updateTextController);

updateRouter.route("/likes").patch(likeMiddleware);

module.exports = updateRouter;
