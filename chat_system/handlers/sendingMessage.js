const Message = require("../model/message");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const sendingMessage = async (chat, socket, messages) => {
  const { to, from, file, message } = messages;
  if (!to || !from) {
    console.log("Missing sender or receiver in chat message;");
    socket.emit("error", "Missing sender or receiver in chat message");
    return;
  }
  if (!message && !file) {
    console.log("Missing sender or receiver in chat message;");
    socket.emit("error", "Missing both message and file in chat");
    return;
  }
  messages.from = socket.userID;
  console.log("incoming message: ", messages);
  const newMessage = new Message(messages);
  try {
    const messageResp = await newMessage.save();
    console.log("saved message: ", messageResp);
    if (!messageResp.inGroup) {
      socket.emit("getting-message", messageResp);
    }
    chat.to(messageResp.to).emit("getting-message", messageResp);
    return;
    // console.log(`sending "${messages.message}" from ${from} to ${to}`);
  } catch (error) {
    console.log(error);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = sendingMessage;
