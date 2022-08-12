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
    if (data) {
      // console.log(data);
      res.json({ friends: data }); // friends is an array of freind objs
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = { getUser, getFriends };
