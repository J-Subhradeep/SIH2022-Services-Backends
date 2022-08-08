const router = require("express").Router();
const fetchRouter = require("./routes/fetchRouter");
const fileRouter = require("./routes/fileRouter");
const removeRouter = require("./routes/removeRouter");
const updateRouter = require("./routes/updateRouter");

router.use("/upload", fileRouter);

router.use("/fetch", fetchRouter);

router.use("/remove", removeRouter);

router.use("/update", updateRouter);

module.exports = router;
