const addFriendController = require("../controllers/addFriendController");
const removeFriendController = require("../controllers/removeFriendController");
const { getFriends } = require("../controllers/user");
const friendRmMiddleware = require("../middlewares/friendRmMiddleware");
const addFriendMiddleware = require("../middlewares/addFriendMiddleware");
const setLastMessageTime = require("../controllers/setLastMessageTime");

const friendRouter = require("express").Router();

friendRouter.put("/add", addFriendMiddleware, addFriendController);

friendRouter.patch("/remove", friendRmMiddleware, removeFriendController);

friendRouter.get("/fetch", getFriends);

friendRouter.patch("/msgtime", setLastMessageTime);


module.exports = friendRouter;
