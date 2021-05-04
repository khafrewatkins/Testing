const express = require("express");
const router = express.Router();
// middleware for handling multipart/form-data
const multer = require("multer");
// Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const upload = multer({ dest: "public/uploads/" });
// use multer's diskStorage engine
const { storage } = require("../middleware/multer");
// point to a controller
const entriesController = require("../controllers/entries");
// use middleware to check if user ir logged in before calling the ultimate handler
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// will change route to /:id to get specific entry
router.get("/:id", entriesController.getEntry);

router.post(
  "/createEntry",
  upload.single("file"),
  entriesController.createEntry
);

// TODO: /createEntry, /like, /edit, /delete, /createComment?, /editComment?, /deleteComment?

router.put("/likeEntry/:id", entriesController.likeEntry);
router.put("/unlikeEntry/:id", entriesController.unlikeEntry);

router.delete("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = router;
