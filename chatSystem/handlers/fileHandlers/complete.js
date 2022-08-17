const complete = async (event, work, socket) => {
  console.log("in complete");
  // console.log(event.file);
  console.log("File meta:", event.file.meta);
  // console.log(event.file.meta.user.file);
  if (event.interrupt) {
    console.log("File was not completely sent");
    socket.emit("error", { message: "File was not completely sent" });
    return;
  }
};
module.exports = complete;
