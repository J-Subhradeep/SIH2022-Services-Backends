const ProfileView = require("../../model/profileView");

const getLastFiveViews = async (req, res) => {
  const { userId = "" } = req.query;
  if (!userId) return res.status(400).json({ message: "Invalid credentials" });

  try {
    const user = await ProfileView.findById(userId);
    if (!user) return res.json({ message: "User not found" });
    const list = user.profileViews;

    const lastfive = list.reverse();
    console.log(lastfive);
    res.send({ list: lastfive });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = getLastFiveViews;
