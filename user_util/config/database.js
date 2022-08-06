const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.js") });
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.UTIL_DB}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.name + ": " + error.message || error);
  }
};
module.exports = connectDatabase;
