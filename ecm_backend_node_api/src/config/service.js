const multer = require("multer");

const image_path = "C:/wamp64/www/image_path/ecmbackend";

const isEmptyOrNull = (value) => {
  if (value == null || value == "") {
    return true;
  }
  return false;
};

const upload = multer({
  // function for upload picture input database in react
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, image_path);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3, // 3MB
  },
});

const isEmail = (value) => {};
module.exports = {
  isEmptyOrNull,
  isEmail,
  upload,
};
