const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../config.env"),
});
const client = require("../../config/client");
const { log } = require("console");

const partialSearchController = async (req, res, next) => {
  const allResult = [];
  const text = req.query.q;
  if (text == "") return res.json({ result: [] });
  try {
    // const result = await client.search({
    //   index: process.env.ELASTICSEARCH_INDEX_NAME,
    //   body: {
    //     size: 1000,
    //     query: {
    //       wildcard: {
    //         desc: {
    //           value: `*${text}*`,
    //         },
    //       },
    //     },
    //   },
    // });
    const result = await client.search({
      index: process.env.ELASTICSEARCH_INDEX_NAME,
      body: {
        size: 1000,
        query: {
          query_string: {
            query: `*${text}*`,
            fields: ["desc"],
          },
        },
      },
    });
    console.log("returned docs:", result.hits.hits.length);
    // for (let eachWord of text.split(" ")) {
    //   console.log(eachWord);
    //   const resultForEachWord = await client.search({
    //     index: process.env.ELASTICSEARCH_INDEX_NAME,
    //     body: {
    //       size: 1000,
    //       query: {
    //         query_string: {
    //           query: `*${eachWord}*`,
    //           fields: ["desc"],
    //         },
    //       },
    //     },
    //   });
    //   // console.log();
    //   // for (let i of resultForEachWord.hits.hits) {
    //   //   allResult.push(i);
    //   // }
    // }
    console.log(allResult.length);
    res.json({ result: result.hits.hits /*, "all-result": allResult*/ });
  } catch (err) {
    console.log(err);
    res.json({ results: err });
  }
};

module.exports = partialSearchController;
