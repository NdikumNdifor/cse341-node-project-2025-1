const express = require('express')
const router = express.Router()

// Import other routes files
const moviesRoutes = require('./moviesRoutes')
const genresRoutes = require('./genresRoutes')
const accountRoutes = require('./accountsRoutes')

// Routes for movies
router.use('/', moviesRoutes) // Now accessible at /movies

// Routes for users
router.use('/', genresRoutes) // Now accessible at /users

// Routes for accounts
router.use('/', accountRoutes)

module.exports = router
