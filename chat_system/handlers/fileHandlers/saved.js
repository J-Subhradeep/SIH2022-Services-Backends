const sendingMessage = require("../sendingMessage");

const saved = async (event, work) => {
  console.log("in saved");
  // console.log(event.file);
  console.log(event.file.meta);
  console.log(event.file.meta.user.file.name);
  const name = event.file.meta.user.file.name;

  const paths = event.file.pathName;
  // fs.renameSync(path, __dirname + "/files/" + name);
  // fs.renameSync(paths, dir + "/resources/" + name);
  const message = event.file.meta.user;
  sendingMessage(work, message);
  // const newMessage = new Message(event.file.meta.user);
  // try {
  //   const messageResp = await newMessage.save();
  //   console.log(messageResp);
  //   work.to(messageResp.to).emit("getting-message", messageResp);
  //   socket.emit("getting-message", messageResp);
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = saved;
