const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const connectDatabase = require("./config/db");
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(cors());
connectDatabase();
// all endpoints
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
