const error = async (err, chat) => {
  socket.emit("error", err);
  console.log("Error in saving");
  console.log("file", err.file);
  console.log(err.error);
  const paths = err.file.pathName;
  console.log("path", paths);
  console.log("Deleting corrupt file: ", err.file);
  fs.unlinkSync(paths);
};
module.exports = error;
