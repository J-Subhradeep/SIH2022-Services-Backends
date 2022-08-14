const Message = require("../model/message");
const path = require("path");
const chalk = require("chalk");
// const userList = require("../controllers/userList");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const workSend = async (work, socket, messages) => {
  const { to, from, file, message } = messages;
  if (!to || !from) {
    console.log(
      chalk.bgRed("[work] Missing sender or receiver in work message;")
    );
    socket.emit("error", "Missing sender or receiver in work message");
    return;
  }
  if (!message && !file) {
    console.log(chalk.bgRed("[work] Missing both message and file in work"));
    socket.emit("error", "Missing both message and file in work");
    return;
  }
  messages.from = socket.userID;
  const newMessage = new Message(messages);
  try {
    const messageResp = await newMessage.save();
    const { to, from, time, message } = messageResp;
    console.log(
      chalk.bgBlue(
        " [work] SAVED [",
        "to: " + to,
        "| from: " + from,
        "| at: " + time + "] "
      )
    );
    console.log(
      message.length < 100
        ? chalk.inverse(message)
        : chalk.inverse(message.substr(0, 100) + "...  ")
    );
    
    work.to(from).emit("set-time", { user: from, other: to });
    work.to(to).emit("set-time", { user: to, other: from });

    // in client;
    // socket.on("set-time", (obj) => {
    //   socket.emit("setting-time", obj);
    // });

    if (!messageResp.inGroup) {
      socket.emit("getting-message", messageResp);
    }
    work.to(messageResp.to).emit("getting-message", messageResp);
    return;
  } catch (error) {
    console.log(error.message);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = workSend;
