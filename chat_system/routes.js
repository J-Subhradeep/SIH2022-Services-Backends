// const { getMessages, getGroupChat, deleteMessage } = require('./controllers/message');
const friendRouter = require("./routes/friendRouter");
const initRouter = require("./routes/initRouter");
const messageRouter = require("./routes/messageRouter");

const router = require("express").Router();

router.use("/init", initRouter);

router.use("/friends", friendRouter);

router.use("/message", messageRouter);

module.exports = router;
