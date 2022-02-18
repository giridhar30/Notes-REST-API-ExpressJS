const express = require("express");
const Note = require("../models/note.model");
const verifyToken = require("../verifyToken");
const router = express.Router();

// fetching all the notes
router.get("/", verifyToken, async (req, res) => {
  const fetchedNotes = await Note.find();
  res.json(fetchedNotes);
});

// fetching a specific note
router.get("/:noteId", verifyToken, async (req, res) => {
  try {
    const specifiedNote = await Note.findById(req.params.noteId);
    res.json(specifiedNote);
  } catch (err) {
    res.status(400).json({ message: `${err} is the error` });
  }
});

// posting a note
router.post("/", verifyToken, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body,
  });

  // old promise method
  // note
  //   .save()
  //   .then((data) => res.json(data))
  //   .catch((err) => res.json({ message: `${err} is the error` }));

  // new promise method
  try {
    const savedNote = await note.save();

    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: `${err} is the error` });
  }
});

// deleting a note
router.delete("/:noteId", verifyToken, async (req, res) => {
  try {
    const deletedNote = await Note.remove({ _id: req.params.noteId });
    res.json(deletedNote);
  } catch (err) {
    res.status(400).json({ message: `${err} is the error` });
  }
});

// updating a note
router.patch("/:noteId", verifyToken, async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: `${err} is the error` });
  }
});

module.exports = router;
