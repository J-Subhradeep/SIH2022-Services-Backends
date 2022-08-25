const ProfileView = require("../model/profileView");
const _ = require("lodash");

const pushViewController = async (req, res) => {
  const { user = "", viewer = "" } = req.body;
  let isFound = false;
  if (!user || !viewer)
    return res.status(400).send({ message: "Invalid input" });

  try {
    const oldViews = await ProfileView.findById(user);
    if (!oldViews) console.log("No old views found");
    else
      isFound = oldViews.profileViews.some((view) => view.owner_id == viewer);

    // if (isFound) {
    //   console.log(`Already viewed profile`);
    //   return res.status(400).json({ message: `Already viewed profile` });
    // }
    const now = new Date();
    const time = now.toLocaleTimeString();
    const ob = { owner_id: viewer, time };
    console.log(ob);
    const view = await ProfileView.findByIdAndUpdate(
      user,
      {
        $push: { profileViews: ob },
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
