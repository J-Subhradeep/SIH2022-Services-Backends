const uploadRouter = require("express").Router();
const indexController = require("../controllers/indexController");

uploadRouter.route("/").post(indexController);

module.exports = uploadRouter;
