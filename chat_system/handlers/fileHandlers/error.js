const errSave = async (err, work) => {
  socket.emit("errSave", err);
  console.log("Error in saving");
  console.log("file", err.file);
  console.log(err.errSave);
  const paths = err.file.pathName;
  console.log("path", paths);
  console.log("Deleting corrupt file: ", err.file);
  fs.unlinkSync(paths);
};
module.exports = errSave;
