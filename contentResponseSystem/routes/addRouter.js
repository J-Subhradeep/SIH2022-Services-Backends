const addCommentController = require("../controllers/add/addCommentController");
const addLikeController = require("../controllers/add/addLikeController");
const addRouter = require("express").Router();

addRouter.patch("/like", addLikeController);

addRouter.patch("/comment", addCommentController);

// addRouter.post("/share", shareController);

module.exports = addRouter;
