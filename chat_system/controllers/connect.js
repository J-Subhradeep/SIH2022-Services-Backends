const path = require("path");
const sendingMessage = require("../handlers/sendingMessage");
const addingFriend = require("../handlers/addingFriend");
const chalk = require("chalk");
const userList = require("./userList");
const setTime = require("../handlers/setTime");

const connectToSocket = async (chat, socket) => {
  console.log(
    chalk.bgYellow('Socket connected to "chat" nsp: '),
    chalk.inverse(socket.userID)
  );

  // Joining it's own room
  const inRoom = socket.rooms;
  if (!Array.from(inRoom).includes(socket.userID)) {
    socket.join(socket.userID); 
  }
  console.log(chalk.bgYellow(" [chat] user rooms: "), Array.from(socket.rooms)); 

  chat.emit("user-connected", socket.userID);
  userList(chat);

  socket.on("sending-message", (message) => {
    sendingMessage(chat, socket, message);
    userList(chat);
  });

  // socket.on("deleting-message", (del_obj) => {
  //   deletingMessage(chat, socket, del_obj);
  //   userList(chat);
  // });
  
  socket.on("adding-friend", (obj) => {
    addingFriend(chat, socket, obj);
    userList(chat);
  });

  socket.on("setting-time", (obj) => {
    setTime(chat, socket, obj);
    userList(chat);
  });
  
  socket.on("disconnect", (socket) => {
    console.log(chalk.bgRed('Socket leaving "chat" nsp'));
    chat.emit("user-lost", "Lost user");
    userList(chat);
  });
};
module.exports = connectToSocket;
