const router = require("express").Router();
const uploadRouter = require("./src/routes/uploadRouter");
const fetchRouter = require("./src/routes/fetchRouter");
const updateRouter = require("./src/routes/updateRouter");
const deleteRouter = require("./src/routes/deleteRouter");
const searchRouter = require("./src/routes/searchRouter");

/**  HOME ROUTE DOES NOTHING */
router.route("/").get(async (req, res) => res.send("home"));

/** (C) INDEXING A DOCUMENT WORKING ABSOLUTELY FINE  */
router.use("/index_doc", uploadRouter);

/** (R) FETCHING A DOCUMENT WORKING ABSOLUTELY FINE  */
router.use("/get_doc", fetchRouter);

/** (U) UPDATING A DOCUMENT  WORKING ABSOLUTELY FINE CAN ALSO ADD EXTRA FIELD ALONG WITH CHANGING VALUES OF OLD ONES */
router.use("/mod_doc", updateRouter);

/** (D) DELETING A DOCUMENT  WORKING ABSOLUTELY FINE  */
router.use("/del_doc", deleteRouter);

/** SEARCH ENDPOINT */
router.use("/search", searchRouter);

// Catch-all endpoint
router.route("*").get((req, res) => res.send("wrong endpoint dummy"));

module.exports = router;
