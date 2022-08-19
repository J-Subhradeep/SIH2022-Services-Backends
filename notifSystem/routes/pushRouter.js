const pushController = require("../controllers/pushController");
const pushViewController = require("../controllers/pushViewController");

const pushRouter = require("express").Router();

pushRouter.patch("/", pushController);

pushRouter.patch("/view", pushViewController);

module.exports = pushRouter;
