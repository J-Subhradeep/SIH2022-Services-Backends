const editCommentController = require("../controllers/editCommentController");

const modRouter = require("express").Router();

modRouter.patch("/comment", editCommentController);

module.exports = modRouter;
