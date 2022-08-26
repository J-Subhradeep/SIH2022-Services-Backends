const ProfileView = require("../../model/profileView");

const getLastFiveViews = async (req, res) => {
  const { userId = "" } = req.query;
  if (!userId) return res.status(400).json({ message: "Invalid credentials" });

  try {
    const user = await ProfileView.findById(userId);
    if (!user) return res.json({ list: [] });
    const list = user.profileViews;

    const lastfive = list.reverse();
    let main = [],
      count = 0;
    for (let i of lastfive) {
      if (count == 5) break;
      isFound = main.some((one) => one.owner_id == i.owner_id);
      if (!isFound) {
        main.push(i);
        count++;
      }
    }

    // const mainlist  = [...new Set(lastfive)];
    // console.log(mainlist);
    res.send({ list: main });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = getLastFiveViews;
