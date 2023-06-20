const multer = require("multer");
const path = require("path");

const destination = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination,
});

const upload = multer({
  storage,
});

module.exports = upload;
