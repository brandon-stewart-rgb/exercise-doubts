const fs = require('fs')
const express = require('express');
const generateUniqueId = require('generate-unique-id');
const router = express.Router();
const notes = require('../db/db.json');
const idFilter = req => note => note.id === parseInt(req.params.id);


// GET all notes
router.get('/',  (req, res) => res.json(notes));

// // get single note
// router.get('/:id', (req, res) => {
//    // if it doesn't exist, false else true.
//    const found = notes.some(note => note.id === parseInt( req.params.id));
//    if(found){
//       res.json(notes.filter(note => note.id === parseInt( req.params.id)));
//    } else {
//       res.sendStatus(400).json( { msg: `No note with the id of ${req.params.id}`});
//    }
// });

// create note can use the same route as long as they are different methods such as Post and generate id;
router.post('/', (req, res) => {
  
   const newNote = {
      // generates random id 
      id:generateUniqueId({length:3, useLetters: false}),
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
   writeNotes();
   res.json(notes);
});

function writeNotes() {
   fs.writeFile('./db/db.js', JSON.stringify(notes, '\t'), err =>{
      if(err) throw err;
      return true;
   });
};

// update note
// router.put('/:id', (req, res) => {
//    // if it doesn't exist, false else true.
//    const found = notes.some(idFilter(req));
  
//    if(found){
//      const updNote = req.body;

//      notes.forEach(note =>{
//       if(idFilter(req)(note)) {
//          // ternary operator
//          const updNote = {...note, ...req.body};
//          notes[i] = updNote;
//          res.json(notes)
//       }
//    });
//    } else {
//       res.sendStatus(400).json( { msg: `No note with the id of ${req.params.id}`});
//    }
// });

// delete note
router.delete('/:id', (req, res) => {
   const found = notes.some(idFilter(res));
 
   if (found) {
   writeNotes();
     res.json(
        notes
   //      {
   //     msg: 'Note has been deleted',
   //     notes: notes.filter(note => !idFilter(req)(note)),
      

   //   }
     );
   } else {
   res.sendStatus(400).json({ msg: `No note with the id of ${req.params.id} was found to delete` });
   }
 });





// function copied from https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript
// var removeByAttr = function(arr, attr, value){
//    var i = arr.length;
//    while(i--){
//       if( arr[i] 
//           && arr[i].hasOwnProperty(attr) 
//           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

//           arr.splice(i,1);
//           return arr;
//       }
//    }
// }

// router.delete('/:id', (req, res) => {
//    removeByAttr(notes, 'id', req.params.id);
//    writeNotes();
//    res.json(notes);
// })











 
module.exports = router;