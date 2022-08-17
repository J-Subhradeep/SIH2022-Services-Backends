const { User } = require("../model/user");

const addFriendController = async (req, res) => {
  const { user = "", friend_id = "", friend_name = "" } = req.body;
  const friend = {
    _id: friend_id,
    name: friend_name,
  };
  try {
    const prevUser = await User.findById(user);
    console.log(prevUser);

    if (!prevUser) {
      console.log("User not found");
      return res.send({ message: "User not found" });
    }

    const isFriend = prevUser.friends.some((frand) => frand._id == friend._id);
    console.log("is it in", isFriend);
    if (isFriend) {
      console.log("Already a friend");
      return res.send({ message: "Already a friend" });
    }

    prevUser.friends.push(friend);
    const newDoc = await prevUser.save();
    console.log(newDoc);
    res.send({ newDoc: newDoc });
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
};
module.exports = addFriendController;
