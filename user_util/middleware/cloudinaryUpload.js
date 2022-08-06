const _ = require("lodash");
const crypto = require("crypto");
const axios = require("axios");

const cloudinaryUpload = async (req, res, next) => {
  console.log("Incoming file: ", req.file);
  if (_.isEmpty(req.file)) {
    console.log("No file found in request files");
    return res.status(400).json({ message: "No file found in request files" });
  }
  const p_id = crypto.randomUUID();
  try {
    const uploadResponse = await axios.post("http://localhost:8000/upload/direct", {
      file_path: req.file.path,
      options: {
        upload_preset: process.env.UPLOAD_PRESET,
        public_id: p_id,
      },
    });
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
