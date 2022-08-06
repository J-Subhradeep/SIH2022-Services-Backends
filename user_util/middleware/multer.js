const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const uploader = multer({
  storage
});

module.exports = uploader;
