const Notif = require("../model/notif");

const nilController = async (req, res) => {
  const { user = "" } = req.body;
  if (!user)
    return res.status(400).send({ message: "Missing user field in request" });
  try {
    const userNotif = await Notif.findByIdAndUpdate(
      user,
      {
        $set: {
          count_unseen: 0,
        },
      },
      { new: true }
    );
    res.json(userNotif);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = nilController;
