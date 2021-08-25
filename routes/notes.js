const fs = require('fs')
const express = require('express');
const generateUniqueId = require('generate-unique-id');
const router = express.Router();
const notes = require('../db/db.json');
// used a lot of concepts from https://www.youtube.com/watch?v=L72fhGm1tfE&list=PLQdiaph1_FwKVM7CHhDym6qtA0GDBWfKN&index=6
// GET all notes
router.get('/',  (req, res) => res.json(notes));

// create note can use the same route as long as they are different methods such as Post and generate id;
router.post('/', (req, res) => { 
   const newNote = {
      // generates random id 
      id:generateUniqueId({length:3, useLetters: false}),
      title: req.body.title,
      text: req.body.text,   
   }

   if (!newNote.title || !newNote.text) {
      // using return instead of else to avoid a 'headers already sent' message
      return res.sendStatus(400).json({ msg: 'Please include a note with a title and text'})
   }

   // adding notes to db.json
   notes.push(newNote);
   writeNotes();
   res.json(notes);
});

// delete note
router.delete('/:id', (req, res) => {
   const found = notes.some(note => note.id === req.params.id);
 
   if (found) {
      // The first argument specifies the location at which to begin removing elements. The second argument specifies the number of elements to remove.
      notes.splice(note => note.id === req.body.id, 1);
      //rewrite the notes
      writeNotes();
      res.json({ msg: 'The note has been deleted', notes });
     
   } else {
      res.sendStatus(400).json({ msg: `No note with the id of ${req.params.id} was found to delete` });
   }
});

// function to write the notes to the .json file
function writeNotes() {
   fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), err =>{
      if(err) throw err;
      return true;
   });
};
 
module.exports = router;