const userModel = require('../models/genresModel')

const listAllGenres = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const users = await userModel.getAllGenres()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(users)
  } catch (err) {
    console.error('Error fetching users', err.message)
    res.status(500).json({ message: err.message || 'Internal server error.' })
  }
}

const insertAGenre = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const objectData = req.body
    const user = await userModel.addASingleGenre(objectData)
    res.setHeader('Content-Type', 'application/json')
    res
      .status(201)
      .json({ message: 'You successfully created a new genre', id: user._id })
  } catch (err) {
    console.error('Failed to insert user')
    res.status(400).json({ message: err.message || 'A server error occured.' })
  }
}

const modifyAGenre = async (req, res) => {
  //#swagger.tags = ['Genres']
  try {
    const userId = req.params.id
    const userData = req.body
    if (
      !userData.genreName ||
      !userData.description ||
      !userData.popularMovies ||
      !userData.subGenres
    ) {
      throw new Error('All the fields must be included')
    }
    const updatedUser = await userModel.updateAGenre(userId, userData)
    res.setHeader('Content-Type', 'application/json')
    res
      .status(201)
      .json({ message: 'User was updated succesfully', id: updatedUser._id })
  } catch (err) {
    res.status(500).json({ message: err.message || 'A server error occured.' })
  }
}

const removeAGenre = async (req, res) => {
  //#swagger.tags = ['Genres']
  const deletedUser = await userModel.deleteAGenre(req.params.id)
  res.setHeader('Content-Type', 'application/json')

  if (deletedUser.error) {
    return res.status(400).json(deletedUser) // Send the error message from the model function
  }

  res.status(200).json(deletedUser)
  // try{
  //   const movieId = req.params.id
  //   const deletedMovie = moviesModel.deleteAMovie(movieId)
  //   res.setHeader('Content-Type', 'application/json')
  //   res.status(200).json(deletedMovie)
  // }catch(err){
  //   res.status(500).json({error: err.message})
  // }
}

module.exports = { listAllGenres, insertAGenre, modifyAGenre, removeAGenre }
