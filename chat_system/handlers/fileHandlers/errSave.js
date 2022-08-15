const chalk = require("chalk");
const fs = require("fs");

const errSave = async (err, work) => {
  // here event is named err
  console.log(chalk.red("Error in saving", err.error));
  const paths = err.file.pathName;
  console.log("Deleting corrupt file: ", err.file.ogname, paths);
  // console.log("file", err.file);
  // console.log("path", paths);
  // console.log(err.errSave);
  fs.unlink(paths, (e) => {
    if (e) console.log(e);
    else console.log("Deleted corrupt file.");
  });
  socket.emit("error", { message: err.error });
  return;
};
module.exports = errSave;
