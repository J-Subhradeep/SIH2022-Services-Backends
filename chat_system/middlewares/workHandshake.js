const chalk = require("chalk");

const workHandshake = async (work, ...args) => {
  console.log(chalk.bgCyan("[work] Handshaking initiated..."));
  const [socket, next] = args;
  console.log("Auth: ", socket.handshake.auth);

  // real values
  const { id = "" } = socket.handshake.auth;
  //   if (!id) {
  //     console.log("No id specified");
  //     socket.emit("error", "Authentication failed");
  //     return;
  //   }
  //   const user = getUser(id); // need to complete this...depends on Subhra's endpoints
  //   if(typeof user === "string"){
  //     console.log("No id specified");
  //     socket.emit("error", user); // the fn returns string if user is not found
  //     return;
  //   }
  //   socket.groups = user.groups; //which is an array of group rooms;
  //   socket.userID = user.room; // which is just the user's room;
  socket.userID = id;

  // dummy values
  // let rm = Math.round(Math.random() * 1000);
  // let userroom = `${rm}`;
  // socket.userID = userroom;

  console.log(chalk.bgCyan("[work] Handshaking Complete..."));
  next();
};
module.exports = workHandshake;
