const path = require("path");
require("dotenv").config({
	path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");

const getAllController = async (req, res, next) => {
	try {
		const result = await client.search({
			index: process.env.ELASTICSEARCH_INDEX_NAME,
			body: {
				size: 1000,
				query: {
					match_all: {},
				},
				sort: [{ time: { order: "desc" } }],
			},
		});
		console.log("returned docs", result.hits.hits.length);
		res.json({ results: result.hits });
	} catch (err) {
		console.log(err);
		res.json({ results: err });
	}
};
module.exports = getAllController;
