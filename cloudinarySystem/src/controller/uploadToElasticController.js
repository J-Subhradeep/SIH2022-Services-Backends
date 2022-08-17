const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const { default: axios } = require("axios");

const uploadToElasticController = async (req, res) => {
  const content = req.content;
  if (!content) {
    console.log("NO CONTENT OBJECT FOUND");
    return res.status(400).json({ message: "Couldn't find content object" });
  }
  try {
    const response = await axios.post(process.env.ELASTIC_INDEX_URL, {
      doc: content,
    });
    const resdata = response.data;
    console.log(resdata);
    const initRsysResp = await axios.post(process.env.RSYS_INIT_URL, {
      c_id: content.id,
    });
    const initResp = initRsysResp.data;
    res
      .status(201)
      .json({ response: { "post-sys": resdata.response, "r-sys": initResp } }); // final response to client
  } catch (error) {
    // handle error
    console.log("Elastic Error: ", error.message || error);
    return res
      .status(500)
      .json({ message: error.name + ": " + error.message || error });
  }
};
module.exports = uploadToElasticController;
