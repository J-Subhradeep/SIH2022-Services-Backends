const searchRouter = require("express").Router();
const getAllController = require("../controllers/search controller/getAllController");
const fullTextSeachController = require("../controllers/search controller/fullTextSeachController");
const partialSearchController = require("../controllers/search controller/partialSearchController");

// GET_ALL ROUTE
searchRouter.route("/get_all").get(getAllController);

// FULL TEXT SEARCH
searchRouter.route("/get_full_text").get(fullTextSeachController);

// PARTIAL TEXT SEARCH
searchRouter.route("/get_partial").get(partialSearchController);

module.exports = searchRouter;
