const moviesModel = require('../models/moviesModel')

const listAllMovies = async (req, res) => {
  try {
    const movies = await moviesModel.getAllMovies()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(movies)
  } catch (err) {
    console.error('Error fetching movies:', err.message)
    res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

module.exports = { listAllMovies }
