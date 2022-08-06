const fetchRouter = require("express").Router();
const cover = require("../controllers/fetch/cover");
const dp = require("../controllers/fetch/dp");
const fetchChatBg = require("../controllers/fetch/chatBg");

// http://localhost:8080/fetch/dp
fetchRouter.route("/dp").get(dp);

// http://localhost:8080/fetch/cover
fetchRouter.route("/cover").get(cover);

// http://localhost:8080/fetch/chatbg
fetchRouter.route("/chatbg").get(fetchChatBg);

module.exports = fetchRouter;
