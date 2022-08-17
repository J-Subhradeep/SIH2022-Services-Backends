const { default: axios } = require("axios");
const path = require("path");
const { User } = require("../model/user");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const setLastMessageTime = async (req, res) => {
  console.log("lst time controller", req.body);
  const { user = "", other = "" } = req.body;
  if (!user || !other) {
    console.log("No user or other found in request");
    return res.json({ message: "No user found in request" });
  }
  try {
    const lastMsg = await axios.get(process.env.LAST_MSG_URL, {
      params: { user_pair: user + "_" + other },
    });
    const msg = lastMsg.data.last_msg;
    const { time } = msg;
    console.log(time);
    const foundUser = await User.findById(user);
    if (foundUser.friends.length == 0) {
      console.log("no friends found");
      return res.json({ message: "no friends found" });
    }
    foundUser.friends = foundUser.friends.map((friend) => {
      if (friend._id == other) {
        friend.lastMsgTime = time;
      }
      return friend;
    });
    const setResult = await foundUser.save();
    console.log("last msg time set");
    res.send({ newDoc: setResult });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
};
module.exports = setLastMessageTime;
