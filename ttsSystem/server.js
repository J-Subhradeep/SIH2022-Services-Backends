const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./config.env") });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes");
const PORT = process.env.PORT || 8088;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use("/", router);

app.listen(PORT, (err) => {
  if (!err) console.log(`Server running on http://localhost:${PORT}`);
});
