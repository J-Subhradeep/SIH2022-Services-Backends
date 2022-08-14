const userList = (nsp) => {
  const user_list = [];
  nsp.fetchSockets().then((sockets) => {
    for (let socket of sockets) {
      user_list.push(socket.userID);
    }
    console.log("users [", nsp.name, "] ", user_list);
    nsp.emit("users-online", user_list);
    return;
  });
};
module.exports = userList;
