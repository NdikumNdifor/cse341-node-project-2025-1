const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  duration: { type: Number, required: true },
  cast: { type: [String], required: true }
})

const MovieModel = mongoose.model('movies', movieSchema)

module.exports = MovieModel
