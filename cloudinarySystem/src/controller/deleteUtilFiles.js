const { cloudinary } = require("../config/cloudinary");

const deleteUtilFiles = async (req, res, next) => {
  const { p_id = "" } = req.query;
  if(p_id == ""){
    console.log("Public ID not found in request");
    return res.status(400).json({ message: "Public ID not found in request" });
  }

  try {
    /** Don't use api.resources.delete for this purpose */
    const del_resp = await cloudinary.uploader.destroy(p_id);
    console.log("Deletion response: ", del_resp);
    res.status(200).json({ Response: del_resp });
  } catch (error) {
    console.log("Error [del utils]: ", error.message || error);
    res
      .status(500)
      .json({ message: error.name + ": " + error.message || error });
  }
};
module.exports = deleteUtilFiles;
