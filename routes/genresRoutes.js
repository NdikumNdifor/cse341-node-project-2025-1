const express = require('express')
const router = express.Router()

const genresController = require('../controllers/genresController')
const utilities = require('../utilities/validation')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all user
router.get('/genres', genresController.listAllUsers)

// Routes to add a new user
router.post('/genres', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    genresController.insertUser
)

// Route to update a user
router.put('/genres/:id', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    genresController.modifyAUser
)

// Route to delete a user
router.delete('/genres/:id', genresController.removeAUser)


module.exports = router