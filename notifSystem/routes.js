const nilController = require("./controllers/nilController");
const pushController = require("./controllers/pushController");

const router = require("express").Router();

router.patch("/push", pushController);

router.patch("/nil", nilController);

module.exports = router;