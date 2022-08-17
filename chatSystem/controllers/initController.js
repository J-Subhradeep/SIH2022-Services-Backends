const { User } = require("../model/user");

const initController = async (req, res) => {
  const { user = "" } = req.body;
  const newUser = new User({ _id: user });
  try {
    const savingUser = await newUser.save();
    console.log(savingUser);
    res.send(savingUser);
  } catch (error) {
    var code;
    console.log("error in saving new user: ", error.message);
    if (error.code == 11000) code = 400;
    else code = 500;
    res.status(code).send(error);
  }
};
module.exports = initController;
