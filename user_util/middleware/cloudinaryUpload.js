const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const crypto = require("crypto");
const axios = require("axios");

const cloudinaryUpload = async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { file_path = "" } = req.body; // the base64 string
  if (!file_path) {
    console.log("No file or base64string found in request sent");
    return res
      .status(400)
      .json({ message: "No file or base64string found in request sent" });
  }
  const p_id = crypto.randomUUID();
  try {
    const uploadResponse = await axios.post(
      process.env.CLOUDINARY_DIRECT_FILE_UPLOAD,
      {
        file_path: file_path,
        options: {
          upload_preset: process.env.UPLOAD_PRESET,
          public_id: p_id,
        },
      }
    );
    const { data: { public_id = "", secure_url = "" } = {} } = uploadResponse;

    if (public_id == "" || secure_url == "") {
      console.log(
        "MISSING upload url and public id, response.data is ",
        uploadResponse.data
      );
      return res
        .status(500)
        .json({ message: "MISSING upload url and public id in response" });
    }

    req.file_uploaded = public_id;
    req.file_url = secure_url;
  } catch (error) {
    console.log("Error [upload middleware]: " + error.message || error);
    return res.status(500).json({
      message: error.name + ": " + error.message || error.response || error,
    });
  }
  next();
};
module.exports = cloudinaryUpload;
