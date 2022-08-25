const getAllNotifs = require("../controllers/get/getAllNotifs");
const getLastFiveViews = require("../controllers/get/getLastFiveViews");
const getProfileViews = require("../controllers/get/getProfileViews");
const getTotalNotifs = require("../controllers/get/getTotalNotifs");
const getUnseenNotifs = require("../controllers/get/getUnseenNotifs");

const getRouter = require("express").Router();

getRouter.get("/notifs", getAllNotifs);

getRouter.get("/unseen", getUnseenNotifs);

getRouter.get("/total", getTotalNotifs);

getRouter.get("/views", getProfileViews);

getRouter.get("/last5", getLastFiveViews);

module.exports = getRouter;
