const axios = require("axios");

const friendRmMiddleware = async (req, res, next) => {
  const { user = "", other = "" } = req.body;
  const user_pair = user + "_" + other;
  try {
    const chatList = await axios.get(process.env.GET_MSG_URL, {
      params: { user_pair },
    });
    const { messages = [] } = chatList.data;
    if (messages.length > 0) {
      console.log("These two users still have chats. Can't un-friend");
      return res.json({
        messages: "These two users still have chats. Can't un-friend",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = friendRmMiddleware;
