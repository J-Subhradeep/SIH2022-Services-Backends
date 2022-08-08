const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const router = require("express").Router();
const uploadRouter = require("./src/routes/uploadRouter");
const deleteRouter = require("./src/routes/deleteRouter");

router.get("/", (req, res) => res.send("home"));

router.use("/upload", uploadRouter);

router.use("/destroy", deleteRouter);

router.route("*").get((req, res) => res.send("Page not found"));

module.exports = router;