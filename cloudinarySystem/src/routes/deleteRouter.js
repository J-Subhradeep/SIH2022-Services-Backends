const deleteRouter = require("express").Router();
const deleteElasticController = require("../controller/deleteElasticController");
const deleteUtilFiles = require("../controller/deleteUtilFiles");

deleteRouter.route("/").delete(deleteElasticController);

deleteRouter.route("/utils").delete(deleteUtilFiles);

module.exports = deleteRouter;
