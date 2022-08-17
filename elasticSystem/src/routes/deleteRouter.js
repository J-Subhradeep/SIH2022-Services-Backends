const deleteRouter = require("express").Router();
const deleteController = require("../controllers/deleteController");
const fetchMiddleware = require("../middlewares/fetchMiddleware");
const delFromCloudinary = require("../middlewares/delFromCloudinary");

deleteRouter
  .route("/")
  .delete(fetchMiddleware, delFromCloudinary, deleteController);

deleteRouter.route("/delete_entry").delete(deleteController);

module.exports = deleteRouter;
