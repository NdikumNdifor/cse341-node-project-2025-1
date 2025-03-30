const express = require('express')
const router = express.Router()

const genresController = require('../controllers/genresController')
const utilities = require('../utilities/validation')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all user
router.get('/genres', genresController.listAllGenres)

// Routes to add a new user
router.post(
  '/genres',
  utilities.creategenreRules(),
  utilities.checkCreategenreData,
  genresController.insertAGenre
)

// Route to update a user
router.put(
  '/genres/:id',
  utilities.creategenreRules(),
  utilities.checkCreategenreData,
  genresController.modifyAGenre
)

// Route to delete a user
router.delete('/genres/:id', genresController.removeAGenre)

module.exports = router
