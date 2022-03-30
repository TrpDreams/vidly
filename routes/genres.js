const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { valid } = require('joi');


const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Comedy' },
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  // Validate the request and return 400 if invalid
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // Create a genre object to push to the genres array
  const genre = {
      id: genres.length + 1,
      name: req.body.name,
  };
  genres.push(genre);
  // Return the added genre for validation on the front end
  res.send(genre);
});

router.put('/:id', (req, res) => {
  // Look up genre with given id
  // Return 404 if not found
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The requested genre ID was not found');
  // Validate
  // If invalid, return 400 - bad request
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  // Update course
  // Return the updated course
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  // Look up genre and return 404 if not found
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre ID does not exist.');
  // Create an index variable to hold the location of the genre in genres
  const index = genres.indexOf(genre);
  // Remove the genre with splice(start location, number of items to remove)
  genres.splice(index, 1);
  // Return the deleted genre
  res.send(genre);
});

// Joi validation function
function validateGenre(genre) {
  // Create a Joi object named schema to validate against
  const schema = Joi.object({
      id: Joi.number(),
      name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;