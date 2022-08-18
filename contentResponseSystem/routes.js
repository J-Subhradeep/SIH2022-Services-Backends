const router = require("express").Router();
const { countLike } = require("./controllers/counters/countLike");
const modRouter = require("./routes/modRouter");
const initRouter = require("./routes/initRouter");
const addRouter = require("./routes/addRouter");
const undoRouter = require("./routes/undoRouter");
const getRouter = require("./routes/getRouter");

router.get("/", (req, res) => res.send("halllo world"));

router.use("/init", initRouter);

router.use("/add", addRouter);

router.use("/undo", undoRouter);

router.use("/mod", modRouter);

router.use("/get", getRouter);

module.exports = router;
