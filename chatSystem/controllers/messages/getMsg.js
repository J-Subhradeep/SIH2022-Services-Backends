const Message = require("../../model/message");
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

const getMsg = async (req, res) => {
  const { m_id = "" } = req.query;
  if (!m_id) {
    console.log("Missing message id in request");
    return res.status(400).json({ message: "Missing message id in request" });
  }
  //   if(typeof m_id == string){
  let mid = mongoose.Types.ObjectId(m_id);
  //   }
  try {
    const msg = await Message.findById(mid);
    if (!msg) {
      console.log("Missing message in database");
      return res.status(404).json({ message: "Missing message in database" });
    }
    const { to = "", from = "", time = "", message = "" } = msg;
    console.log(
      chalk.bgWhite(
        " FETCHED [",
        "to: " + to,
        "| from: " + from,
        "| at: " + time + "] "
      )
    );
    console.log(
      message.length < 100
        ? chalk.blue(message)
        : chalk.blue(message.substr(0, 100) + "...  ")
    );
    res.send({ message: msg });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
module.exports = getMsg;
