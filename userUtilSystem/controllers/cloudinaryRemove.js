const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const axios = require("axios");

const cloudinaryRemove = async (req, res) => {
  console.log("Req.deleted in cloudinary_remove: ", req.deleted);
  const { file: public_id = "", isUpdate = false } = req.deleted;
  console.log("public_id: " + public_id);

  if (public_id == "") {
    console.log("No public id found in request");
    return res.status(400).json({ message: "No public id found in request" });
  }

  try {
    const removal_resp = await axios.delete(
      process.env.CLOUDINARY_DELETE_FILE_URL,
      {
        params: {
          p_id: public_id,
        },
      }
    );
    console.log("what is this: ", removal_resp.data);
    res.send({
      isUpdate,
      file: req.deleted,
      deleted: removal_resp.data,
    });
  } catch (error) {
    console.log("err: ", error);
    res.status(500).send({ message: error.name + ": " + error.message });
  }
};

module.exports = cloudinaryRemove;
