const express = require('express');
const trackApi = require('./track/track.js')
const app = express();
const port = 1111;

// Define your functions
const functions = {
  getImage: (author, track) => trackApi.getImageFromTrackName(author, track),
};

// Define route for function1
// Example: http://localhost:1234/getimage?author=<AUTHOR_NAME_HERE>&track=<TRACK_NAME_HERE>
app.get('/getimage', (req, res) => {
  const author = req.query.author;
  const track = req.query.track;
  Promise.resolve(functions.getImage(author, track)).then((result)=> res.send(result));
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});