const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/moviesController')
const utilities = require('../utilities/validation')

// Require auth middleware
const {isAuthenticated} = require('../middle-ware/authenticate')


//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all movies
router.get('/movies', moviesController.listAllMovies)

// Routes to add a new movie
router.post(
  '/movies', isAuthenticated,
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.insertAMovie
)

// Route to update a movie
router.put(
  '/movies/:id', isAuthenticated,
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.modifyAMovie
)

// Route to delete a movie
router.delete('/movies/:id', isAuthenticated, moviesController.removeAMovie)

module.exports = router
