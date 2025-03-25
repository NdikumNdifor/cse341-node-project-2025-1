const express = require('express')
const router = express.Router()

// Import other routes files
const moviesRoutes = require('./moviesRoutes')

router.use('/', moviesRoutes) // Now accessible at /moves

module.exports = router
