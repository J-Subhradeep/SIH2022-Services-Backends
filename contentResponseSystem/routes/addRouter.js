const addCommentController = require("../controllers/add/addCommentController");
const addLikeController = require("../controllers/add/addLikeController");
const addShareController = require("../controllers/add/addShareController");
const postShareMiddleware = require("../middlewares/postShareMiddleware");
const shareMiddleware = require("../middlewares/shareMiddleware");
const addRouter = require("express").Router();

addRouter.patch("/like", addLikeController);

addRouter.patch("/comment", addCommentController);

addRouter.post(
  "/share",
  shareMiddleware,
  postShareMiddleware,
  addShareController
);

module.exports = addRouter;
