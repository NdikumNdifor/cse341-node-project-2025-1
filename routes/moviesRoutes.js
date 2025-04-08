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

// POST a movie
// #swagger.tags = ['Movies']
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Add a new movie',
//     required: true,
//     schema: { $ref: '#/definitions/Movie' }
// }
router.post(
  '/movies', isAuthenticated,
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.insertAMovie
)

// #swagger.tags = ['Movies']
// #swagger.summary = 'Update a movie'
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.parameters['id'] = {
//     in: 'path',
//     description: 'Movie ID',
//     required: true,
//     type: 'string'
// }
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Updated movie data',
//     required: true,
//     schema: { $ref: '#/definitions/Movie' }
// }
// #swagger.responses[201] = { description: 'Movie updated successfully' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.put(
  '/movies/:id', isAuthenticated,
  utilities.createMovieRules(),
  utilities.checkCreateMovieData,
  moviesController.modifyAMovie
)

// #swagger.tags = ['Movies']
// #swagger.summary = 'Delete a movie'
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.parameters['id'] = {
//     in: 'path',
//     description: 'Movie ID',
//     required: true,
//     type: 'string'
// }
// #swagger.responses[200] = { description: 'Movie deleted successfully' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.delete('/movies/:id', isAuthenticated, moviesController.removeAMovie)

module.exports = router
