const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
const { log } = require("console");
const axios = require("axios");

const fetchMiddleware = async (req, res, next) => {
  const { id = "" } = req.query;
  if (id == "") {
    console.log("missing id in request");
    return res.status(400).json({ message: "Missing id" });
  }
  log(req.query);
  try {
    /** First fetching the document using the id from another api endpoint*/
    const userPostFetchResp = await axios.get(
      process.env.ELASTIC_SELF_GET_URL,
      {
        params: { id },
      }
    );
    // //console.log("Axios Response (fetch middleware): ", userPostFetchResp.data);
    const {
      data: { response: { _source: doc = {} } = {}, result, status },
    } = userPostFetchResp;
    console.log("Response in fetch middleware: ", status, result, doc);
    if (!doc.file || doc.file == "") {
      console.log("No file field found in document");
      return res
        .status(404)
        .json({ message: "No file field found in document" });
    }
    req.files = doc.file;
    req.user = id;
    // //return res.send(doc.file);
  } catch (err) {
    log("Error in fetch middleware: ", err.response.data || err.message || err);
    return res.status(500).json({ message: err.response.data.message || err });
  }
  next();
};
module.exports = fetchMiddleware;
