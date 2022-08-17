const { Client } = require("@elastic/elasticsearch");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });

const client = new Client({
  cloud: {
    id: process.env.ELASTICSEARCH_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

module.exports = client;
