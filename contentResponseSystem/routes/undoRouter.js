const unComment = require("../controllers/undo/unComment");
const unLike = require("../controllers/undo/unLike");
const undoRouter = require("express").Router();

undoRouter.patch("/like", unLike);

undoRouter.patch("/comment", unComment);

module.exports = undoRouter;

// ,
// 	"body":"suka blyat !?!"
