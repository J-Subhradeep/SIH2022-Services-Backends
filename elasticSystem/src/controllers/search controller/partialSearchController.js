const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");

const partialSearchController = async (req, res, next) => {
  const text = req.query.q;
  try {
    const result = await client.search({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      body: {
        size: 1000,
        query: {
          wildcard: {
            title: {
              value: `*${text}*`,
            },
          },
        },
      },
    });
    console.log("returned docs:", result.hits.hits.length);
    res.json({ results: result.hits });
  } catch (err) {
    console.log(err);
    res.json({ results: err });
  }
};

module.exports = partialSearchController;
