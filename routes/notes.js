// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "../notes.json");

// // GET all notes
// router.get("/", (req, res) => {
//   try {
//     const data = fs.readFileSync(filePath, "utf-8");
//     const notes = JSON.parse(data);
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ message: "Error reading notes file" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../notes.json");

// ✅ Utility: Read notes from file
function getNotes() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// ✅ Utility: Save notes to file
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// ✅ GET all notes
router.get("/", (req, res) => {
  try {
    const notes = getNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error reading notes file" });
  }
});

// ✅ POST a new note
router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const notes = getNotes();

    const newNote = {
      id: Date.now(),
      title,
      description,
    };

    notes.push(newNote);
    saveNotes(notes);

    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error adding note" });
  }
});

// ✅ DELETE a note by ID
router.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  const notes = getNotes();
  const filteredNotes = notes.filter((note) => note.id != noteId);

  if (notes.length === filteredNotes.length) {
    return res.status(404).json({ message: "Note not found" });
  }

  saveNotes(filteredNotes);
  res.json({ message: "Note deleted successfully" });
});

// ✅ PUT /notes/:id - update a note
router.put("/:id", (req, res) => {
    const noteId = req.params.id;
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }
  
    const notes = getNotes();
    const noteIndex = notes.findIndex((note) => note.id == noteId);
  
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }
  
    notes[noteIndex].title = title;
    notes[noteIndex].description = description;
  
    saveNotes(notes);
    res.json({ message: "Note updated successfully", note: notes[noteIndex] });
  });
  

module.exports = router;

