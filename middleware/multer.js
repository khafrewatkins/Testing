// The disk storage engine gives you full control on storing files to disk.
// There are two options available, destination and filename. They are both functions that determine where the file should be stored.
const multer = require("multer");
module.exports = {
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "/src/post-images");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    },
  }),
};