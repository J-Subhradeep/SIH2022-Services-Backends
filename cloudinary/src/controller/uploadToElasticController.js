const { default: axios } = require("axios");

const uploadToElasticController = async (req, res) => {
  const content = req.content;
  if (!content) {
    console.log("NO CONTENT OBJECT FOUND");
    return res.status(400).json({ message: "Couldn't find content object" });
  }
  try {
    const response = await axios.post("http://localhost:5000/index_doc", {
      doc: content,
    });
    const resdata = response.data;
    console.log(resdata);
    res.status(201).json({ response: resdata.response }); // final response to client
  } catch (error) {
    // handle error
    console.log("Elastic Error: ", error.message || error);
    return res
      .status(500)
      .json({ message: error.name + ": " + error.message || error });
  }
};
module.exports = uploadToElasticController;
