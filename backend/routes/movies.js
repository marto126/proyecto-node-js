const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/MovieController');

// Ruta principal: /api/movies
router
  .route('/')
  .get(getMovies)
  .post(createMovie);

// Rutas con parámetro ID: /api/movies/:id
router
  .route('/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;