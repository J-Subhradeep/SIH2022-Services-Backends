const nilController = require("./controllers/nilController");
const pushController = require("./controllers/pushController");
const getRouter = require("./routes/getRouter");
const pushRouter = require("./routes/pushRouter");

const router = require("express").Router();

router.use("/get", getRouter);

router.use("/push", pushRouter);

router.patch("/nil", nilController);

module.exports = router;
