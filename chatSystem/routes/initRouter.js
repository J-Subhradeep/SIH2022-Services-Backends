const initController = require("../controllers/initController");
const initRouter = require("express").Router();

initRouter.post("/", initController);

module.exports = initRouter;
