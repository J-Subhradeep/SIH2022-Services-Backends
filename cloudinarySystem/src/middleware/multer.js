const multer = require("multer");
const path = require("path");
const storageEngine = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const maxSize = 50 * 1024 * 1024; // 50MB

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: maxSize },
});

module.exports = upload;
