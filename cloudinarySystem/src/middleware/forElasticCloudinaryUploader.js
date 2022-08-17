const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const { uploadOptions } = require("../config/uploadConfig");
const crypto = require("node:crypto");
const _ = require("lodash");
const { default: axios } = require("axios");

const forElasticCloudinaryUploader = async (req, res, next) => {
  let files = [],
    url = [];

  console.log("The file array is ", req.body.files);
  if (req.body.files.length == 0 || !req.body.files) {
    console.log(
      "MISSING REQ.FILES -- Couldn't uplaod any file. Continuing without a file"
    );
    req.upload = { files, url };
    next();
    return;
    // return res.status(400).json({
    //   message: "Couldn't find file array in req.file / req.file missing",
    // });
  }

  try {
    for (let file of req.body.files) {
      let file_id = "video";
      const pub_id = crypto.randomUUID();
      const regex = new RegExp("data:image");
      if (regex.test(file)) {
        file_id = "image";
        delete uploadOptions["resource_type"];
        delete uploadOptions["chunk_size"];
      }

      const uploadResponse = await axios.post(
        process.env.CLOUDINARY_DIRECT_UPLOAD_URI,
        {
          file_path: file,
          options: {
            ...uploadOptions,
            public_id: pub_id,
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

      file_id = file_id + "&" + public_id;
      files.push(file_id);
      url.push(secure_url);
    }
    console.log(files, url);
    req.upload = { files, url };
  } catch (error) {
    console.log("Error [upload middleware]: " + error.message || error);
    // console.log(error.response.data);
    return res.status(500).json({
      message: error.response.data.message || error.response || error,
    });
  }
  next();
};
module.exports = forElasticCloudinaryUploader;
