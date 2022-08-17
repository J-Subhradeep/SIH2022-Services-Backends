const { default: axios } = require("axios");
const { default: mongoose } = require("mongoose");
const Message = require("../../model/message");

const deleteMessage = async (req, res) => {
  const { m_id = "", user = "", other = "" } = req.query;
  const msg_id = mongoose.Types.ObjectId(m_id);
  console.log("Deleting message [", msg_id, "]");

  try {
    const message = await Message.findById(msg_id);
    if (!message) {
      console.log("No message found with that id;");
      return res.json({ messages: "No message found with that id" });
    }
    if (message.from != user) {
      console.log("You can't delete this message");
      return res.json({ messages: "You can't delete this message" });
    }
    const delResponse = await Message.findByIdAndDelete(msg_id);
    console.log(delResponse);
    // const delUserCheck = await axios.patch(process.env.FRIEND_REMOVAL_URL, {
    //   data: {
    //     user,
    //     other,
    //   },
    // });
    // const { stillFriend = null } = delUserCheck.data;
    res.json({ deleted_message: delResponse });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = deleteMessage;
