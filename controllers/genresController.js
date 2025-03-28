const userModel = require('../models/genresModel')

const listAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'List all users',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  try {
    const users = await userModel.getAllUsers()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(users)
  } catch (err) {
    console.error('Error fetching users', err.message)
    res.status(500).json({ message: err.message || 'Internal server error.' })
  }
}

const insertUser = async (req, res) => {
  //#swagger.tags = ['Users']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Add a user to list',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  try{
    const objectData = req.body
    const user = await userModel.addASingleMovie(objectData);
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({message:'You successfully created a new user', id: user._id})
  }catch(err){
    console.error('Failed to insert user')
    res.status(400).json({message: err.message || 'A server error occured.'})
  }
}

const modifyAUser = async (req, res) => {
  //#swagger.tags = ['Users']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Update a user based on id',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  try{
    const userId = req.params.id
    const userData = req.body
    if(!userData.genreName || !userData.description|| !userData.popularMovies || !userData.subGenres){
      throw new Error('All the fields must be included')
    }
    const updatedUser = await userModel.updateAMovie(userId, userData)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({message:'User was updated succesfully', id: updatedUser._id})
  }catch(err) {
    res.status(500).json({message: err.message || 'A server error occured.'})
  }
}

const removeAUser = async (req, res) =>{
  //#swagger.tags = ['Users']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Delete a user from list',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  const deletedUser = await userModel.deleteAMovie(req.params.id);
  res.setHeader('Content-Type', 'application/json');
  
  if (deletedUser.error) {
    return res.status(400).json(deletedUser); // Send the error message from the model function
  }

  res.status(200).json(deletedUser);
  // try{
  //   const movieId = req.params.id
  //   const deletedMovie = moviesModel.deleteAMovie(movieId)
  //   res.setHeader('Content-Type', 'application/json')
  //   res.status(200).json(deletedMovie)
  // }catch(err){
  //   res.status(500).json({error: err.message})
  // }
}

module.exports = { listAllUsers, insertUser, modifyAUser, removeAUser}
