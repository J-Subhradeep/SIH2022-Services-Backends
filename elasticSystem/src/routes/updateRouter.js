const updateRouter = require("express").Router();
const delCommentController = require("../controllers/delCommentController");
const commentController = require("../controllers/update/commentController");
const decrementShares = require("../controllers/update/decrementShare");
const incrementShares = require("../controllers/update/incrementShares");
const likeController = require("../controllers/update/likeController");
const updateTextController = require("../controllers/update/updateTextController");
const delCommentMiddleware = require("../middlewares/delCommentMiddleware");
// const commentMiddleware = require("../middlewares/update/commentMiddleware");
const likeMiddleware = require("../middlewares/update/likeMiddleware");

// for title and desc
updateRouter.route("/text").patch(updateTextController);

updateRouter.route("/likes").patch(likeMiddleware, likeController); // done

updateRouter.route("/comments").patch(commentController);

updateRouter.route("/Ashare").patch(incrementShares);

updateRouter.route("/Dshare").patch(decrementShares);


updateRouter
  .route("/deleteComment")
  .patch(delCommentMiddleware, delCommentController);
  

module.exports = updateRouter;
