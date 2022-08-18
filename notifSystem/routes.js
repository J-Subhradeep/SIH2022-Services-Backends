const nilController = require("./controllers/nilController");
const pushController = require("./controllers/pushController");
const getRouter = require("./routes/getRouter");

const router = require("express").Router();

router.patch("/push", pushController);

router.patch("/nil", nilController);

router.use("/get", getRouter);

module.exports = router;
