const hasLiked = require("../controllers/get/hasLiked");

const getRouter = require("express").Router();

getRouter.get("/hasLiked", hasLiked);

module.exports = getRouter;
