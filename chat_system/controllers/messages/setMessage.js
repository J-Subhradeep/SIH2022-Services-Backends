const Message = require("../../model/message");

const setMessages = async (req, res) => {
  const { msg } = req.body;
  // const tm = new Date();
  // const time = tm.toLocaleTimeString();
  const newMessage = new Message({ ...msg });
  try {
    const messageResp = await newMessage.save();
    console.log(messageResp);
    res.send(newMessage);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = setMessages;
