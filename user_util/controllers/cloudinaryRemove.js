const axios = require("axios");

const cloudinaryRemove = async (req, res) => {

  console.log("Req.deleted in cloudinary_remove: ",req.deleted);
  const { file: public_id = "" } = req.deleted;
  console.log("public_id: " + public_id);

  if(public_id == ""){
    console.log("No public id found in request");
    return res.status(400).json({ message: "No public id found in request" });
  }
  
  try {
    const removal_resp = await axios.delete(
      "http://localhost:8000/destroy/utils",
      {
        params: {
          p_id: public_id,
        },
      }
    );
    console.log(removal_resp.data);
    res.status(200).json({ file: req.deleted, deleted: removal_resp.data });
  } catch (error) {
    console.log("err: ", error);
    res.status(500).json({ message: error.name + ": " + error.message });
  }
};

module.exports = cloudinaryRemove;
