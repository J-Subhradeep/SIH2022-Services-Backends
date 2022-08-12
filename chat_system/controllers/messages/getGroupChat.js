const Message = require("../../model/message");

const getGroupChat = async (req, res) => {
  const groupid = req.params.groupid;
  try {
    const groupChat = await Message.find({
      $and: [{ to: groupid }, { inGroup: true }],
    }).sort({ time: 1 });
    console.log("Group chat [", groupid, "]: ", groupChat);
    res.json({ messages: groupChat });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

module.exports = getGroupChat;
