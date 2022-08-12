const SocketIOFileUpload = require("socketio-file-upload");
const path = require("path");
const sendingMessage = require("../handlers/sendingMessage");
const complete = require("../handlers/fileHandlers/complete");
const saved = require("../handlers/fileHandlers/saved");
const error = require("../handlers/fileHandlers/error");
const deletingMessage = require("../handlers/deletingMessage");
const addingFriend = require("../handlers/addingFriend");
const removingFriend = require("../handlers/removingFriend");

const connectToSocket = async (chat, socket) => {
  console.log("Socket connected");
  const uploader = new SocketIOFileUpload();
  uploader.dir = path.join(__dirname, "../resources");
  uploader.listen(socket);

  console.log(socket.groups);

  // Error handler:
  uploader.on("error", (err, chat) => error(err, chat));
  // On complete file upload
  uploader.on("complete", complete);

  // on successfull saving of the file and chaining message to db...
  uploader.on("saved", (event, chat) => saved(event, chat));

  // connecting the user to their own room and groups on connection
  const inRoom = socket.rooms;
  // Joining it's own room
  if (!Array.from(inRoom).includes(socket.userID)) {
    socket.join(socket.userID); // you need to set socket.userID in handshake
  }
  console.log(Array.from(socket.rooms)); // socket.rooms is implicit prop..

  // const groups = getGroupRooms(); // the fn should return either a set, map or an array // No need; handled in handshake

  // Joining all the group rooms
  for (let group of socket.groups) {
    socket.join(group);
  }
  console.log("Rooms the socket is in: ", Array.from(socket.rooms)); // socket.rooms is implicit prop..
  chat.emit("user-connected", socket.userID);
  socket.emit("joined", [socket.userID, ...socket.groups]);

  // socket.emit("session", {
  //   sessionID: socket.sessionID,
  //   userID: socket.userID,
  // });

  // sending online user in the server namespace
  const user_list = [];
  chat.fetchSockets().then((sockets) => {
    for (let socket of sockets) {
      user_list.push(socket.userID);
    }
    console.log("User list: ", user_list);
    chat.emit("users-online", user_list);
  });

  // main chat event
  socket.on("sending-message", (message) =>
    sendingMessage(chat, socket, message)
  );

  socket.on("deleting-message", (del_obj) => {
    deletingMessage(chat, socket, del_obj);
  });

  socket.on("adding-friend", (obj) => {
    addingFriend(chat, socket, obj);
  })

  socket.on("removing-friend", (obj) => {
    removingFriend(chat, socket, obj);
  })

  socket.on("disconnect", (socket) => {
    if (!socket.connected) {
      chat.emit("user-lost");
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room.room);
    socket.emit("joined-given-room", Array.from(socket.rooms));
  });
};
module.exports = connectToSocket;
