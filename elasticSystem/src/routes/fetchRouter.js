const fetchRouter = require("express").Router();
const fetchController = require("../controllers/fetchController")

fetchRouter.route("/").get(fetchController)

module.exports = fetchRouter;