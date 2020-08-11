/* eslint-disable indent */
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan());
const cors = require('cors');
app.use(cors());
const data = require('./playstore_data');

app.get('/apps', (req, res) => {
 const { sort, genres } = req.query;
 const validSorts = ['Rating', 'App'];
 if (sort && !validSorts.includes(sort)) {
  return res.status(400).send('Sort needs to be one of "Rating" or "App"');
 }

 const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
 if (genres && !validGenres.includes(genres)) {
  return res.status(400).send('Genre needs to be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade" or "Card"');
 }

 let results = data;

 if (sort) {
  results
   .sort((a, b) => {
    return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
   });
 }

 if (genres) {
  results = results
   .filter(app => {
    return app.Genres.includes(genres);
   });
 }

 res
  .json(results);
});


app.listen(8080, () => console.log('Server is live on port 8080'));
