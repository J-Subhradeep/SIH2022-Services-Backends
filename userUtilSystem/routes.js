const router = require("express").Router();
const fetchRouter = require("./routes/fetchRouter");
const fileRouter = require("./routes/fileRouter");
const removeRouter = require("./routes/removeRouter");
const updateRouter = require("./routes/updateRouter");

router.use("/", (req, res) => {
    console.log("UTIL system HOME")
    res.send("UTIL system HOME")
});

router.use("/fetch", fetchRouter);

router.use("/remove", removeRouter);

router.use("/upload", updateRouter);

module.exports = router;
