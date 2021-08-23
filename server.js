const express = require('express');
// We assign express() to the app variable so that we can later chain on methods to the Express.js server.
const app = express();
const { db } = require('./Develop/db/db');

app.get('/api/db', (req, res) => {
  let results = db;
  console.log(req.query)
  res.json(results);
});

app.listen(3001, ()=> {
    console.log('API server now on port 3001!');
});