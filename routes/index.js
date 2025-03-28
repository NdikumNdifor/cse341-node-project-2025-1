const express = require('express')
const router = express.Router()

// Import other routes files
const moviesRoutes = require('./moviesRoutes')
const usersRoutes = require('./usersRoutes')

// Routes for movies
router.use('/', moviesRoutes) // Now accessible at /movies

// Routes for users
router.use('/', usersRoutes) // Now accessible at /users


module.exports = router
