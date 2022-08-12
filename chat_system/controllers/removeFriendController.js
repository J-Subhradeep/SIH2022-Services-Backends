const { User } = require("../model/user");

const removeFriendController = async (req, res) => {
  const { user = "", other = "" } = req.body;

  try {
    const userFound = await User.findById(user);
    if (!userFound) {
      console.log("User was not found");
      return res.send({ message: "User was not found" });
    }

    const isFriend = userFound.friends.some((frand) => frand._id == other);
    if (!isFriend) {
      console.log("Could not find friend with id " + other);
      return res.send({ message: "Friend not found" });
    }
    userFound.friends = userFound.friends.filter(
      (friend) => friend.id != other
    );
    const newUser = await userFound.save();
    const stillFriend = newUser.friends.some((frand) => frand._id == other);
    if (!stillFriend) {
      return res.json({
        newDoc: newUser,
      });
    }
    res.json({ message: "Some error occurred. Please review code and logs" });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = removeFriendController;
