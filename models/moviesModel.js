const MovieModel = require('./movieSchema-model')

const getAllMovies = async () => {
  try {
    const result = await MovieModel.find()
    if (!result || result.length === 0) {
      throw new Error('Sorry, no movie was found.')
    }
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { MovieModel, getAllMovies }
