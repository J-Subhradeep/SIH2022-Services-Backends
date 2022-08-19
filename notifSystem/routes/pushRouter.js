const pushController = require("../controllers/pushController");

const pushRouter = require("express").Router();

pushRouter.patch("/", pushController);

// pushRouter.patch("/view", );

module.exports = pushRouter;
