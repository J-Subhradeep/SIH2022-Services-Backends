const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./config.env") });
const { default: axios } = require("axios");
const translate = require("@vitalets/google-translate-api");
const router = require("express").Router();

router.get("/", (req, res) => res.send("halllllo"));

router.post("/translate", async (req, res) => {
  console.table(req.body);
  const { source = "", target = "", text = "" } = req.body;
  if (!source || !target || !text) {
    console.log("Missing fields in request body");
    return res.status(400).send({ message: "Missing fields in request body" });
  }
  try {
    const result = await translate(text, {
      to: target,
      from: source,
      client: "gtx",
    });
    console.log(result.text);
    res.send(result.text);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
