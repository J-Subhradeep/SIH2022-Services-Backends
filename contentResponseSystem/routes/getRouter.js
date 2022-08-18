const commentList = require("../controllers/get/commentList");
const hasCommented = require("../controllers/get/hasCommented");
const hasLiked = require("../controllers/get/hasLiked");
const hasShared = require("../controllers/get/hasShared");

const getRouter = require("express").Router();

getRouter.get("/hasCommented", hasCommented);

getRouter.get("/hasShared", hasShared);

getRouter.get("/hasLiked", hasLiked);

getRouter.get("/comment_list", commentList);

module.exports = getRouter;
