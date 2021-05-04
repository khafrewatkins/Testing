// Enable connection to database
const mongoose = require("mongoose");

// Template for storing entries in database
const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Allow other files to access the Entry schema
module.exports = mongoose.model("Entry", EntrySchema);
