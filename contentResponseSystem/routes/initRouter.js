const initController = require("../controllers/initController");
const commentInit = require("../middlewares/init/commentInit");
const shareInit = require("../middlewares/init/shareInit");

const initRouter = require("express").Router();

initRouter.post("/", shareInit, commentInit, initController);

module.exports = initRouter;
