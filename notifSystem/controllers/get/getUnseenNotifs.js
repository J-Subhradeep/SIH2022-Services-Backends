const Notif = require("../../model/notif");

const getUnseenNotifs = async (req, res) => {
  const { user = "" } = req.query;
  if (!user) return res.status(400).json({ message: "Missing credentials" });
  try {
    const userNotifs = await Notif.findById(user);
    if (userNotifs) {
      return res.json({ unseen: userNotifs.count_unseen });
    }
    res.json({ user: userNotifs });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = getUnseenNotifs;
