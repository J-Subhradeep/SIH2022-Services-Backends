const { default: axios } = require("axios");

const addFriendMiddleware = async (req, res, next) => {
  const { user = "", friend_id = "", friend_name = "" } = req.body;
  const friend = {
    _id: friend_id,
    name: friend_name,
  };
  const user_pair = user + "_" + friend._id;
  try {
    const chatList = await axios.get(process.env.GET_MSG_URL, {
      params: { user_pair },
    });
    console.log(chatList.data);
    if (chatList.data.messages.length == 0) {
      console.log("No conversation with this user.");
      return res.send({
        message: "No conversation with this user.",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = addFriendMiddleware;
