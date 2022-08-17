const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "config.env"),
});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(cors());

// all endpoints middleware
app.use(routes);

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server running on http://localhost:${port}`);
});
