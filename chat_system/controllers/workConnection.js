const SocketIOFileUpload = require("socketio-file-upload");
const path = require("path");
const complete = require("../handlers/fileHandlers/complete");
const saved = require("../handlers/fileHandlers/saved");
const chalk = require("chalk");
const workSend = require("../handlers/workSend");
const userList = require("./userList");
const errSave = require("../handlers/fileHandlers/error");
const removingFriend = require("../handlers/removingFriend");
const setTime = require("../handlers/setTime");

const workConnection = async (work, socket) => {
  const uploader = new SocketIOFileUpload();
  uploader.dir = path.join(__dirname, "../resources");
  uploader.listen(socket);

  console.log(
    chalk.bgYellow('Socket connected to "work" nsp: '),
    chalk.inverse(socket.userID)
  );
  const inRoom = socket.rooms;
  if (!Array.from(inRoom).includes(socket.userID)) {
    socket.join(socket.userID);
  }

  console.log(chalk.bgYellow(" [work] user rooms: "), Array.from(socket.rooms));
  work.emit("user-connected", socket.userID);
  userList(work);

  uploader.on("error", (err, work) => errSave(err, work));
  uploader.on("complete", (event, work) => complete(event, work));
  uploader.on("saved", (event, work) => saved(event, work));

  socket.on("sending-message", (message) => {
    workSend(work, socket, message);
    userList(work);
  });

  socket.on("deleting-message", (del_obj) => {
    workDelete(work, socket, del_obj);
    userList(work);
  });

  socket.on("removing-friend", (obj) => {
    removingFriend(work, socket, obj);
    userList(work);
  });

  socket.on("setting-time", (obj) => {
    setTime(work, socket, obj);
    userList(work);
  });

  socket.on("disconnect", (socket) => {
    console.log(chalk.bgRed('Socket leaving "work" nsp'));
    work.emit("user-lost", "Lost user");
    userList(work);
  });

};
module.exports = workConnection;
