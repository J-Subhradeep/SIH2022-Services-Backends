// const { getMessages, getGroupChat, deleteMessage } = require('./controllers/message');
const friendRouter = require("./routes/friendRouter");
const initRouter = require("./routes/initRouter");
const messageRouter = require("./routes/messageRouter");
const path = require("path");

const router = require("express").Router();

router.get("/", (req, res) => { console.log("chat home"); res.send("chat home") });

router.get("/resources/:path", (req, res) => {
  const fullUrl = req.originalUrl;
  // console.log(path, fullUrl);
  //   const fpath = fullUrl;
  try {
    res.download(`${path.join(__dirname, fullUrl)}`);
  } catch (error) {
    console.log("error");
    res.send(error);
  }
});

router.use("/init", initRouter);

router.use("/friends", friendRouter);

router.use("/message", messageRouter);

module.exports = router;
