const addCommentController = require("../controllers/add/addCommentController");
const addLikeController = require("../controllers/add/addLikeController");
const shareMiddleware = require("../middlewares/shareMiddleware");
const addRouter = require("express").Router();

addRouter.patch("/like", addLikeController);

addRouter.patch("/comment", addCommentController);

addRouter.post("/share", shareMiddleware,shareController);

module.exports = addRouter;
