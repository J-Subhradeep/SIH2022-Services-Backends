const setMessage = require("../controllers/messages/setMessage");
const getMessages = require("../controllers/messages/getMessages");
// const getGroupChat = require("../controllers/messages/getGroupChat");
const deleteMessage = require("../controllers/messages/deleteMessage");
const getLastChat = require("../controllers/messages/getLastChat");
const getMsg = require("../controllers/messages/getMsg");
const messageRouter = require("express").Router();

//  set messages from outside
messageRouter.post("/set", setMessage);

//  Get all messages for a user pair
messageRouter.get("/oneOone", getMessages);

messageRouter.get("/only", getMsg);

//  Get last message for a user pair
messageRouter.get("/last", getLastChat);

// for groups
// messageRouter.get("/grp/:groupid", getGroupChat);

// for deleting single messages;
messageRouter.delete("/del", deleteMessage);

module.exports = messageRouter;
