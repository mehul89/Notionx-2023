const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE:1 Fetch all notes using GET API= "http://localhost:5000/api/notes/fetchnotes" login require

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE:2 Add notes using POST API= "http://localhost:5000/api/notes/addnote" login require

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter at least 3 characters in title").isLength({ min: 3 }),
    body("description", "Enter at least 5 characters in title").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if thareare error returen bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE:3 update existing note using PUT API= "http://localhost:5000/api/notes/updatenote" login require

router.put("/updatenote/:id", fetchuser, 
async (req, res) => {

  try {
    const { title, description, tag } = req.body;

    //createing new note object 
    const newnote = {};

    if (title) {newnote.title = title };
    if (description) {newnote.description = description };
    if (tag) {newnote.tag = tag };

    // Find the note to be updated and update it 

    let note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed ")
    }

    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newnote}, {new:true})

    res.json({note});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE:4 Delete an  existing note using DELETE API= "http://localhost:5000/api/notes/deletenote" login require


router.delete("/deletenote/:id", fetchuser,
 async (req, res) => {
   
     try {
        //find the note to be delete and delete it 
        
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found")
        }
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed ")
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"success" : "Note hase been deleted" , note: note});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
