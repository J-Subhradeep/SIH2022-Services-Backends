const { default: axios } = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const removingFriend = async (work, socket, obj) => {
  const { user = "", other = "" } = obj;
  if (!user || !other) {
    console.log("Missing user or friend");
    socket.emit("error", "Missing user or friend");
    return;
  }

  try {
    const frRemovalResp = await axios.patch(process.env.FRND_REM_URL, {
      user,
      other,
    });
    console.log(frRemovalResp.data);
    const { message = "", newDoc = {} } = frRemovalResp.data;
    if (message) {
      console.log(message);
      socket.emit("error", message);
      return;
    }
    socket.emit("new-you", newDoc);
  } catch (error) {
    console.log(error);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = removingFriend;
