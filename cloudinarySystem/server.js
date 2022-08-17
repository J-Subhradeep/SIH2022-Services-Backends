const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(cors());

// all endpoints
app.use(router);

app.listen(PORT, (err) => {
  if (!err) console.log(`Server running on http://localhost:${PORT}`);
  else console.log(`Error occured while setting up server`);
});
