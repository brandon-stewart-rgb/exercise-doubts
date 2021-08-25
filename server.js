var express = require('express');
// We assign express() to the app variable so that we can later chain on methods to the Express.js server.
const app = express();
const path = require('path');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
// HTTP responses
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
  
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Notes routes
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>   {
   console.log(`Server started on ${PORT}`);
}); 

