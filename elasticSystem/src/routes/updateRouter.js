const updateRouter = require("express").Router();
const updateController = require("../controllers/updateController");

updateRouter.route("/").put(updateController);

module.exports = updateRouter;
