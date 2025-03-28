const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/usersController')
const utilities = require('../utilities/validation')

//Routes for Api documentation.
router.use('/', require('./swagger'))

// Routes to get all user
router.get('/users', moviesController.listAllUsers)

// Routes to add a new user
router.post('/users', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    moviesController.insertUser
)

// Route to update a user
router.put('/users/:id', 
    utilities.createUserRules(),
    utilities.checkCreateUserData, 
    moviesController.modifyAUser
)

// Route to delete a user
router.delete('/users/:id', moviesController.removeAUser)


module.exports = router