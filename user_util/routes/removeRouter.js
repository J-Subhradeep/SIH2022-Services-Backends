const removeRouter = require("express").Router();
const cloudinaryRemove = require("../controllers/cloudinaryRemove");
const removeChatBg = require("../middleware/remove/removeChatBg");
const removeCover = require("../middleware/remove/removeCover");
const removeDp = require("../middleware/remove/removeDp");

// http://localhost:8080/remove/cover
removeRouter.route("/cover").delete(removeCover, cloudinaryRemove);

// http://localhost:8080/remove/dp
removeRouter.route("/dp").delete(removeDp, cloudinaryRemove);

// http://localhost:8080/remove/chat_bg
removeRouter.route("/chat_bg").delete(removeChatBg, cloudinaryRemove);

module.exports = removeRouter;
