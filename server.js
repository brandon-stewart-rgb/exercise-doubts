var express = require('express');
// We assign express() to the app variable so that we can later chain on methods to the Express.js server.
const app = express();
// const logger = require('./middleware/logger')
const path = require('path');




// init middleware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 



 // HTTP responses
 //==========================================================
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});





// Set static folder
// Use for middleware
app.use(express.static(path.join(__dirname, 'public')));

// Notes routes
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>   {
   console.log(`Server started on ${PORT}`);
}); 













// Routes
// ===========================================================
// app.get('/', (req, res) => {
//    res.send('Welcome to the Star Wars Page!');
//  });
 
//  app.get('/api/characters', (req, res) => {
//    return res.json(characters);
//  });
 
//  app.get('/api/characters/:character', (req, res) => {
//    const chosen = req.params.character;
 
//    for (let i = 0; i < characters.length; i++) {
//      if (chosen === characters[i].routeName) {
//        return res.json(characters[i]);
//      }
//    }
//    return res.send('No character found');
//  });
 
//  // Create a ---POST--- route that adds new characters
//  app.post('/api/characters', (req, res)=>{
//    const addCharacter = req.body;
//    characters.push(addCharacter);
//    // characters.concat(addCharacter);
//     res.json(characters)
//  })