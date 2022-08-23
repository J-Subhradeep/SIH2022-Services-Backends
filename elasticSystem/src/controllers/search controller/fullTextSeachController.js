const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");

const fullTextSeachController = async (req, res, next) => {
  const text = req.query.q;
  try {
    const result = await client.search({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      body: {
        // size: 1000,
        query: {
          bool: {
            must: {
              multi_match: {
                /* performs match opertion on multiple fields
                    but we can perform match_phrase by mentional type of multi_match as type:"phrase"*/
                query: text,
                fields: ["desc"],
              },
            },
            should: {
              multi_match: {
                query: text,
                fields: ["desc"],
                type: "phrase",
              },
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

module.exports = fullTextSeachController;
