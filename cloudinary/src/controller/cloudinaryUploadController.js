const { cloudinary } = require("../config/cloudinary");
const _ = require("lodash");

const cloudinaryUploadController = async (req, res, next) => {
  const { file_path: f_path = "", options = {} } = req.body;
  if (f_path == "" || _.isEmpty(options)) {
    console.log("MISSING FILE PATH OR OPTIONS");
    return res
      .status(400)
      .json({ message: "Missing file path or options in cloudinary upload" });
  }
  console.log("inputs in cloudinary upload: ", f_path, options);
  try {
    const uploadToCloudResp = await cloudinary.uploader.upload(f_path, {
      ...options,
    });
    console.log(uploadToCloudResp);
    res.send(uploadToCloudResp);
  } catch (error) {
    //handle error
    console.log("Error in upload to cloudinary: " + error.message || error);
    return res
      .status(500)
      .json({ message: error.name + ": " + error.message || error });
  }
};
module.exports = cloudinaryUploadController;
