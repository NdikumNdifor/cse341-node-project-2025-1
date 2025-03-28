const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/moviesController')
const utilities = require('../utilities/validation')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all movies
router.get('/movies', moviesController.listAllMovies)

// Routes to add a new movie
router.post(
  '/movies',
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.insertAMovie
)

// Route to update a movie
router.put(
  '/movies/:id',
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.modifyAMovie
)

// Route to delete a movie
router.delete('/movies/:id', moviesController.removeAMovie)

module.exports = router
