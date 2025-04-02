const express = require('express')
const router = express.Router()

// Import other routes files
const moviesRoutes = require('./moviesRoutes')
const genresRoutes = require('./genresRoutes')
const accountRoutes = require('./accountsRoutes')
const authenticateRoute = require('./authenticationRoute')

// Routes for movies
router.use('/', moviesRoutes) // Now accessible at /movies

// Routes for users
router.use('/', genresRoutes) // Now accessible at /users

// Routes for accounts
router.use('/', accountRoutes)

router.use('/', authenticateRoute)

// 

module.exports = router
