const getGroupRooms = require("./getGroupRooms");
const User = require("../model/user");

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    console.log("User not found");
    return "User not found";
  }
  const room = user._id;
  const groups = getGroupRooms(id); // should return an array of strings(group rooms)
  return {
    groups,
    room,
  };
};

// const user = getUser();
// console.log(user.groups, user.room);
module.exports = getUser;
