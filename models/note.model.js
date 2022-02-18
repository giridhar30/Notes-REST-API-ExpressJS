const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: String,
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
