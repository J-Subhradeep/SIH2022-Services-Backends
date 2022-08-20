const deleteRouter = require("express").Router();
const deleteController = require("../controllers/deleteController");
const fetchMiddleware = require("../middlewares/fetchMiddleware");
const delFromCloudinary = require("../middlewares/delFromCloudinary");
const unShareController = require("../controllers/unShareController");

deleteRouter
  .route("/")
  .delete(fetchMiddleware, delFromCloudinary, deleteController);

deleteRouter.route("/delete_share").delete(deleteController,unShareController);

module.exports = deleteRouter;
