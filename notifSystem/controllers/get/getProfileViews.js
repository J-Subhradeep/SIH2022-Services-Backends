const ProfileView = require("../../model/profileView");

const getProfileViews = async(req, res) => {
  const { user = "" } = req.query;
  if (!user) return res.status(400).send({ message: "Invalid credentials" });

  try {
    const views = await ProfileView.findById(user);
    if(!views) return res.status(404).send({ message: "User not found" });
    res.send({ views: views.profileViews})
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = getProfileViews;
