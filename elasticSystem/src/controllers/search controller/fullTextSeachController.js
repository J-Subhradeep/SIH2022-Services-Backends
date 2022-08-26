const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");

const fullTextSeachController = async (req, res, next) => {
  let searchList = [],
    tagRes = [];
  const text = req.query.q;
  const tags = text.split(" ");

  try {
    for (let i = 0; i < tags.length; i++) {
      const result = await client.search({
        index: process.env.ELASTICSEARCH_INDEX_NAME,
        body: {
          size: 1000,
          query: {
            match: {
              tags: {
                query: tags[i],
              },
            },
          },
        },
      });
      searchList = result.hits.hits;
      for (let f = 0; f < searchList.length; f++) {
        const isFound = tagRes.some(
          (one) => searchList[f]._source.id == one.id
        );
        if (!isFound) tagRes.push(searchList[f]._source);
      }
      // console.log("returned docs:", result.hits.hits.length);
    }
    res.json({ result: tagRes || []});
  } catch (err) {
    console.log(err);
    res.json({ result: err });
  }
};

module.exports = fullTextSeachController;
