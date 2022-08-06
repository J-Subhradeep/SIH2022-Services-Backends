const { cloudinary } = require("../config/cloudinary");
const checkResType = require("../utils/checkResType");

const deleteElasticController = async (req, res) => {
  const { file = "" } = req.query;
  if (file == "") {
    console.log("MISSING REQ.QUERY -- NO FILE FOUND");
    return res.status(400).json({ message: "No file found" });
  }
  const [res_type, p_id] = file.split("&");
  console.log("resource and public id of file: ", res_type, p_id);
  if (checkResType(res_type) || p_id == "") {
    console.log("Invalid file type or public id");
    return res.status(400).json({ message: "Invalid file credentials" });
  }

  try {
    /** Don't use api.resources.delete for this purpose */
    const delMediaResponse = await cloudinary.uploader.destroy(p_id, {
      resource_type: res_type,
    });
    console.log("Deletion response: ", delMediaResponse);
    
    // add status to response
    res.status(200).json({ Response: delMediaResponse });
  } catch (error) {
    console.log("Error in deletion controller: ", error.message || error);
    res
      .status(500)
      .json({ message: error.name + ": " + error.message || error });
  }
};
module.exports = deleteElasticController;
