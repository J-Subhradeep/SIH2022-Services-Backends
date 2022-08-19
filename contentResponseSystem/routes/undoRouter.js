const unComment = require("../controllers/undo/unComment");
const unLike = require("../controllers/undo/unLike");
const unShare = require("../controllers/undo/unShare");
const undoRouter = require("express").Router();

undoRouter.patch("/like", unLike);

undoRouter.patch("/comment", unComment);

undoRouter.patch("/share", unShare);

module.exports = undoRouter;

