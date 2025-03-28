const { MovieModel } = require('./movieSchema-model')
const { ObjectId } = require('mongodb')

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

const addASingleMovie = async (objectData) => {
  try {
    const { title, director, releaseYear, genre, rating, duration, cast } =
      objectData
    if (
      !title ||
      !director ||
      !releaseYear ||
      !genre ||
      !rating ||
      !duration ||
      !cast
    ) {
      throw new Error('All the fields must be present')
    }
    const result = await MovieModel.create(objectData)
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateAMovie = async (movieId, movieData) => {
  try {
    if (!ObjectId.isValid(movieId)) {
      throw new Error('Your movie ID is incorrect')
    }
    // const {title, director, releaseYear, genre, rating, duration, cast} = movieData
    const result = await MovieModel.findOneAndUpdate(
      { _id: new ObjectId(movieId) },
      { $set: movieData },
      { new: true }
    )
    if (result.matchedCount === 0) {
      return { message: 'No movie was found with this ID' }
    }
    if (result.modifiedCount === 0) {
      return {
        message: 'No changes made, the contact data is already up to date.'
      }
    }
    return {
      message: 'Contact updated successfully',
      modifiedCount: result.modifiedCount
    }
  } catch (err) {
    console.error(err.message)
    return { err: err.message }
  }
}

const deleteAMovie = async (movieId) => {
  try {
    if (!ObjectId.isValid(movieId)) {
      throw new Error('No contact found with the given ID')
    }
    const result = await MovieModel.findOneAndDelete({
      _id: new ObjectId(movieId)
    })
    if (!result) {
      throw new Error('No contact was deleted.')
    }
    return {
      message: 'Contact deleted succesfully',
      deletedMovie: result
    }
  } catch (err) {
    console.error(err.message)
    return { error: err.message }
  }
}

module.exports = {
  MovieModel,
  getAllMovies,
  addASingleMovie,
  updateAMovie,
  deleteAMovie
}
