const getAllNotifs = require("../controllers/get/getAllNotifs");
const getTotalNotifs = require("../controllers/get/getTotalNotifs");
const getUnseenNotifs = require("../controllers/get/getUnseenNotifs");

const getRouter = require("express").Router();

getRouter.get("/notifs", getAllNotifs);

getRouter.get("/unseen", getUnseenNotifs);

getRouter.get("/total", getTotalNotifs);

module.exports = getRouter;
