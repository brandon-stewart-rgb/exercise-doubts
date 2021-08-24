const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const notes = require('../db/db.json');

// GET all notes
router.get('/',  (req, res) => res.json(notes));

// get single note
router.get('/:id', (req, res) => {
   // if it doesn't exist, false else true.
   const found = notes.some(note => note.id === parseInt( req.params.id));
   if(found){
      res.json(notes.filter(note => note.id === parseInt( req.params.id)));
   } else {
      res.sendStatus(400).json( { msg: `No note with the id of ${req.params.id}`});
   }
});

// create note can use the same route as long as they are different methods such as Post.
router.post('/', (req, res) => {
   const newNote = {
      // generates random id via uuid
      id:uuid.v4(),
      title: req.body.title,
      text: req.body.text,
      status: 'active'
   }
   if(!newNote.title || !newNote.text) {
      // using return instead of else to avoid a 'headers already sent' message
      return res.sendStatus(400).json({ msg: 'Please include a note with a title and text'})
   } 
   // adding notes to db.json
   notes.push(newNote);
   res.json(notes);
});
module.exports = router;