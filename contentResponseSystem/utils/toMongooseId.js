const mongoose = require("mongoose");
const convertId = (id) => {
  try {
    return mongoose.Types.ObjectId(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = convertId;
