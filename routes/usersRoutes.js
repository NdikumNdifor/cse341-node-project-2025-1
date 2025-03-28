const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/usersController')
const utilities = require('../utilities/validation')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all user
router.get('/genres', moviesController.listAllUsers)

// Routes to add a new user
router.post('/genres', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    moviesController.insertUser
)

// Route to update a user
router.put('/genres/:id', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    moviesController.modifyAUser
)

// Route to delete a user
router.delete('/genres/:id', moviesController.removeAUser)


module.exports = router