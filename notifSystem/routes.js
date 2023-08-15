const nilController = require("./controllers/nilController");
const pushController = require("./controllers/pushController");

const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("notif home")
    res.send("notif home")
});

router.patch("/push", pushController);

router.patch("/nil", nilController);

module.exports = router;