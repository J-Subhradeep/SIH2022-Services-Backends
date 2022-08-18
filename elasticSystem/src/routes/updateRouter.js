const updateRouter = require("express").Router();
const commentController = require("../controllers/update/commentController");
const likeController = require("../controllers/update/likeController");
const updateTextController = require("../controllers/update/updateTextController");
const commentMiddleware = require("../middlewares/update/commentMiddleware");
const likeMiddleware = require("../middlewares/update/likeMiddleware");

// for title and desc
updateRouter.route("/text").patch(updateTextController);

updateRouter.route("/likes").patch(likeMiddleware, likeController); // done

updateRouter.route("/comments").patch(commentController);

module.exports = updateRouter;
