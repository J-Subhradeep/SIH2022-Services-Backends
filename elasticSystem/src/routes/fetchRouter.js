const fetchRouter = require("express").Router();
const fetchByIdController = require("../controllers/fetchByIdController");
const fetchController = require("../controllers/fetchController")

fetchRouter.route("/").get(fetchController)

fetchRouter.route("/postid").get(fetchByIdController)

module.exports = fetchRouter;