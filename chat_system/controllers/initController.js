const { User } = require("../model/user");

const initController = async (req, res) => {
  const { user = "" } = req.body;
  const newUser = new User({ _id: user });
  try {
    const savingUser = await newUser.save();
    console.log(savingUser);
    res.send(savingUser);
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
};
module.exports = initController;
