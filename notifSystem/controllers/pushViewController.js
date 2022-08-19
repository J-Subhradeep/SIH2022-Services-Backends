const ProfileView = require("../model/profileView");

const pushViewController = async (req, res) => {
  const { user = "", viewer = "" } = req.body;
  let isFound = false;
  if (!user || !viewer)
    return res.status(400).send({ message: "Invalid input" });

  try {
    const oldViews = await ProfileView.findById(user);
    if (!oldViews) console.log("No old views found");
    else isFound = oldViews.profileViews.some((view) => view == viewer);

    if (isFound)
      return res
        .status(400)
        .json({ message: "Hotobhaga kotobar dekhbi profile ta ?!" });

    const view = await ProfileView.findByIdAndUpdate(
      user,
      {
        $push: { profileViews: viewer },
      },
      { new: true, upsert: true, rawResult: true }
    );
    res.json(view);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
module.exports = pushViewController;
