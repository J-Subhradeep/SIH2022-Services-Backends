// const Sessions = require("../model/sessions");
const getUser = require("../utils/getUser");
// const { v4: uuidv4 } = require("uuid");

const chatMiddleware = async (chat, ...args) => {
  // console.log("here", chat, args);
  console.log("Handshaking...");
  const [socket, next] = args;
  console.log("Auth: ", socket.handshake.auth);

  // real values
  // const { id = "" } = socket.handshake.auth;
  // if (!id) {
  //   console.log("No id specified");
  //   socket.emit("error", "Authentication failed");
  //   return;
  // }
  // const user = getUser(id); // need to complete this...depends on Subhra's endpoints
  // if(typeof user === "string"){
  //   console.log("No id specified");
  //   socket.emit("error", user); // the fn returns string if user is not found
  //   return;
  // }
  // socket.groups = user.groups; //which is an array of group rooms;
  // socket.userID = user.room; // which is just the user's room;

  // dummy values
  // let userroom = "0000";
  let rm = Math.round(Math.random() * 1000);
  let userroom = `${rm}`;
  socket.userID = userroom;
  socket.groups = ["456"];

  next();
};
module.exports = chatMiddleware;
