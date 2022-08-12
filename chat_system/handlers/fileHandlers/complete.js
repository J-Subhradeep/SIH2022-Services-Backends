const complete = async(event) => {
  console.log("in complete");
  console.log(event.file);
  console.log(event.file.meta);
  console.log(event.file.meta.user.file);
  if (event.interrupt) {
    console.log("File was not completely sent");
    return false;
  }
};
module.exports = complete;
