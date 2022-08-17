const { User } = require("../model/user");

const getUser = async (req, res) => {
  const { user = "" } = req.query;
  try {
    const foundUser = await User.findById(user);
    if (foundUser) {
      // console.log(foundUser);
      return res.json({ status: "found", user: foundUser });
    }
    res.json({ status: "not found" });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const getFriends = async (req, res) => {
  const { user = "" } = req.query;
  console.log(req.query);
  try {
    const foundFriends = await User.findById(user);
    if (!foundFriends) {
      console.log("User not found");
      return res.json({ message: "user not found" });
    }

    const data = foundFriends.friends;
    if (data.length == 0) {
      console.log("No friends found");
      return res.json({ message: "No friends found" });
    }

    const contact = data.sort((a, b) => {
      if (Date.parse(`${a.lastMsgTime}`) > Date.parse(`${b.lastMsgTime}`))
        return -1;
      else if (Date.parse(`${a.lastMsgTime}`) < Date.parse(`${b.lastMsgTime}`))
        return 1;
      else return 0;
    });

    if (contact.length > 0) {
      // console.log(data);
      res.json({ friends: contact }); // friends is an array of freind objs
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = { getUser, getFriends };
