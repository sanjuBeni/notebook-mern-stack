const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Notes = require("../mongoose_module/Notes");
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../mongoose_module/Notes");

// Route 1 : Fetch all notes using GET method

router.get("/allnotes", fetchUser, async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json(allNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Route 2 : Add the notes using method POST

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be at least 3 character.").isLength({ min: 3 }),
    body("description", "Description must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { title, description, tag } = req.body;

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// Route 3 : Update a existing note using : PUT methos

router.put("/editnote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");
    
    if (note.user.toString() !== req.user.id)
    return res.status(401).send("Note allowed.");
    
    let updateNote = await Notes.findByIdAndUpdate(req.params.id,{ $set: newNote },{ new: true });
      res.json({ updateNote });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Router 4 : Delete a existing note using : DELETE method

router.delete('/deletenote/:id', fetchUser, async(req, res) => {

  try {
    let note = await Notes.findById(req.params.id);

    if(!note){
      return res.status(404).send('Not Found');
    }

    if(note.user.toString() !== req.user.id){
      res.status(401).send('Not Allowed');
    }
    
    await Notes.findByIdAndDelete(req.params.id);

    res.json({'success' : 'Note has been deleted successfully'}); 
    
  } catch (error) {
    res.status(500).json({error : 'Internal server error.'});
  }

});

module.exports = router;
