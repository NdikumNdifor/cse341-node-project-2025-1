const express = require('express')
const router = express.Router()

const genresController = require('../controllers/genresController')
const utilities = require('../utilities/validation')

// Require auth middleware
const {isAuthenticated} = require('../middle-ware/authenticate')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all user
router.get('/genres', genresController.listAllGenres)

// #swagger.tags = ['Genres']
// #swagger.summary = 'Add a new genre'
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.consumes = ['application/json']
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Genre to add',
//     required: true,
//     schema: { $ref: '#/definitions/Genre' }
// }
// #swagger.responses[201] = { description: 'Genre created successfully' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.post(
  '/genres', isAuthenticated,
  utilities.creategenreRules(),
  utilities.checkCreategenreData,
  genresController.insertAGenre
)

// #swagger.tags = ['Genres']
// #swagger.summary = 'Update an existing genre'
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.consumes = ['application/json']
// #swagger.parameters['id'] = {
//     in: 'path',
//     description: 'Genre ID',
//     required: true,
//     type: 'string'
// }
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Updated genre data',
//     required: true,
//     schema: { $ref: '#/definitions/Genre' }
// }
// #swagger.responses[201] = { description: 'Genre updated successfully' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.put(
  '/genres/:id', isAuthenticated,
  utilities.creategenreRules(),
  utilities.checkCreategenreData,
  genresController.modifyAGenre
)

// #swagger.tags = ['Genres']
// #swagger.summary = 'Delete a genre'
// #swagger.security = [{ "GitHubOAuth": ["user"] }]
// #swagger.parameters['id'] = {
//     in: 'path',
//     description: 'Genre ID',
//     required: true,
//     type: 'string'
// }
// #swagger.responses[200] = { description: 'Genre deleted successfully' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.delete('/genres/:id', isAuthenticated, genresController.removeAGenre)

module.exports = router
