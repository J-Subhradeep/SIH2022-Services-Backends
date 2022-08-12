const { default: axios } = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const addingFriend = async (chat, socket, obj) => {
  const { user = "", friend_id = "", friend_name = "" } = obj;
  if (!user || !friend_name || !friend_id) {
    console.log("Missing user or friend name/id");
    socket.emit("error", "Missing user or friend name/id");
    return;
  }
  try {
    const addFrResp = await axios.put(process.env.FRND_ADD_URL, {
      user,
      friend_id,
      friend_name,
    });
    const { newDoc = {}, message = "" } = addFrResp.data;
    if (message) {
      console.log("While adding friend: " + message);
      socket.emit("error", message);
      return;
    }
    socket.emit("new-you", newDoc);
    return;
  } catch (error) {
    console.log(error);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = addingFriend;
