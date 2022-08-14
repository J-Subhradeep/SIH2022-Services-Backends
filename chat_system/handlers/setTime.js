const { default: axios } = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const setTime = async (nsp, socket, obj) => {
  const { user = "", other = "" } = obj;

  if (!user || !other) {
    console.log("No user or other found in request");
    socket.emit("error", "No user or other found in request");
    return;
  }

  try {
    const settingResp = await axios.patch(process.env.LAST_TIME, {
      user: user,
      other: other,
    });
    const { newDoc = {}, message = "" } = settingResp.data;
    if (message) {
      console.log("While setting time: " + message);
      socket.emit("error", message);
      return;
    }
    socket.emit("new-you", newDoc);
  } catch (error) {
    console.log(error.message);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = setTime;
