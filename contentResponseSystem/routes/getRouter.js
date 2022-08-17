const hasCommented = require("../controllers/get/hasCommented");
const hasLiked = require("../controllers/get/hasLiked");
const hasShared = require("../controllers/get/hasShared");

const getRouter = require("express").Router();

getRouter.get("/hasCommented", hasCommented);

getRouter.get("/hasShared", hasShared);

getRouter.get("/hasLiked", hasLiked);

module.exports = getRouter;
