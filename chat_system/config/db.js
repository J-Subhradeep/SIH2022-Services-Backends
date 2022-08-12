const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const mongoose = require("mongoose");

const connectDatabase = async () => {
  // console.log("Trying to connect to database...");
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
