const _ = require("lodash");
const Cover = require("../../models/coverModel");

const coverMod = async (req, res, next) => {
  const { user = "" } = req.body;
  if (user == "" || req.file_uploaded == "" || req.file_url == "") {
    console.log("Invalid credentials just after upload to cloudinary...in mod");
    return res.status(500).json({
      message: "Invalid credentials just after upload to cloudinary...in mod",
    });
  }
  try {
    const oldCover = await Cover.findById(user); // returns null if no doc is found otherwise returns document
    const update_res = await Cover.findByIdAndUpdate(
      user,
      {
        $set: {
          file: req.file_uploaded,
          url: req.file_url,
        },
      },
      { new: true, upsert: true, rawResult: true }
    );

    console.log(update_res);
    if (!update_res.lastErrorObject.updatedExisting) {
      return res.json({
        message: "New document created successfully",
        doc: update_res,
      });
    }
    req.deleted = oldCover;
    req.deleted.isUpdate = true;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.name + ": " + error.message });
  }
};
module.exports = coverMod;
