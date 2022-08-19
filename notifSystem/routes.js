const nilController = require("./controllers/nilController");
const pushController = require("./controllers/pushController");
const getRouter = require("./routes/getRouter");
const pushRouter = require("./routes/pushRouter");

const router = require("express").Router();

router.use("/get", getRouter);

router.patch("/push", pushRouter);

// router.patch("/push", pushController);

router.patch("/nil", nilController);


module.exports = router;
