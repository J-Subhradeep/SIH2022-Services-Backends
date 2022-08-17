const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const axios = require("axios");
const _ = require("lodash");

const delFromCloudinary = async (req, res, next) => {
  let files = req.files;
  // const id = req.user;
  const deletedList = [];
  //  this deletes the file from cloudinary and the response can be either "ok" or "not found", in either cases it's fine to delete the post from ES...
  try {
    for (let file of files) {
      const delMediaResponse = await axios.delete(
        process.env.DELETE_ELASTIC_CLOUDINARY_URL,
        {
          params: { file },
        }
      );
      const { data: { Response = {} } = {} } = delMediaResponse;
      console.log("Deletion response in delFromCloudinary: ", Response);
      if (Response.result == "ok") deletedList.push(true);
      else if (Response.result == "not found") deletedList.push(false);
      else deletedList.push(null);
    }
    req.media_deleted = deletedList;
    console.log("Deleted media: ", req.media_deleted);
    // return res.json({ status: req.media_deleted });
  } catch (error) {
    // console.log(error);
    const { response: { data = {} } = {} } = error;
    console.log(
      "Error: ",
      !_.isEmpty(data) ? data : null,
      error.message || error
    );
    res.status(502).json({ message: data.message || error }); // for some issue with file deletion
  }
  next();
};
module.exports = delFromCloudinary;
