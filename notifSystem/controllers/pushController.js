const Notif = require("../model/notif");

const pushController = async (req, res) => {
  let nots = [];
  const { user = "", message, type, id } = req.body;
  let messages = typeof message === "string" ? [message] : message;
  let types = typeof type === "string" ? [type] : type;
  let ids = typeof id === "string" ? [id] : id;
  messages.map((msg, index) => {
    let obj = { id: ids[index], message: msg, type: types[index] };
    nots.push(obj);
  });

  console.log(nots);
  if (!user)
    return res.status(400).send({ message: "Missing user field in request" });
  let total, unseen;
  try {
    const oldNotif = await Notif.findById(user);
    if (oldNotif) {
      const { total_count, count_unseen } = oldNotif;
      total = total_count;
      unseen = count_unseen;
    } else {
      total = 0;
      unseen = 0;
    }
    const userNotif = await Notif.findByIdAndUpdate(
      user,
      {
        $set: {
          total_count: nots.length + total,
          count_unseen: nots.length + unseen,
        },
        $push: { notifications: { $each: nots } },
      },
      { new: true, upsert: true, rawResult: true }
    );
    res.json(userNotif);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = pushController;
