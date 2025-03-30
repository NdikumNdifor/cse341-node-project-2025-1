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

const genreShcema = new mongoose.Schema({
  genreName: { type: String, required: true },
  description: { type: String, required: true },
  popularMovies: { type: [String], required: true, default: [] },
  subGenres: { type: [String], required: true, default: [] }
})

const MovieModel = mongoose.model('movies', movieSchema)
const userModel = mongoose.model('genres', genreShcema)

module.exports = { MovieModel, userModel }
