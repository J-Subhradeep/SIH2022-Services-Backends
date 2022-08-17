const chalk = require("chalk");

const saved = async (event, work) => {
  console.log("in saved", event.file.meta);
  console.log("file name b4 renaming:", event.file.meta.user.file.name);
  const name = event.file.meta.user.file.name;
  const paths = event.file.pathName;
  // console.log(name, paths);
  // fs.renameSync(path, __dirname + "/files/" + name);
  // fs.renameSync(paths, dir + "/resources/" + name);
  fs.rename(paths, dir + "/resources/" + name, (e) => {
    if (e) console.log("error in renaming file", e);
    else console.log("Renamed");
  });

  const newMessage = new Message(event.file.meta.user);
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

    work.to(messageResp.to).emit("getting-message", messageResp);
    socket.emit("getting-message", messageResp);
    
  } catch (error) {
    console.log("err in saving msg to db:", error);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = saved;
