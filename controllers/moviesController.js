const {moviesModel} = require('../models/moviesModel')

const listAllMovies = async (req, res) => {
  //#swagger.tags = ['Movies']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'List all movies',
      required: true,
      schema: { $ref: '#/definitions/Movie' }
  } */
  try {
    const movies = await moviesModel.getAllMovies()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(movies)
  } catch (err) {
    console.error('Error fetching movies', err.message)
    res.status(500).json({ message: err.message || 'Internal server error.' })
  }
}

const insertAMovie = async (req, res) => {
  //#swagger.tags = ['Movies']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Add a movie to list',
      required: true,
      schema: { $ref: '#/definitions/Movie' }
  } */
  try{
    const objectData = req.body
    const movie = await moviesModel.addASingleMovie(objectData);
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({message:'You successfully created a new movie', id: movie._id})
  }catch(err){
    console.error('Failed to insert movie')
    res.status(400).json({message: err.message || 'A server error occured.'})
  }
}

const modifyAMovie = async (req, res) => {
  //#swagger.tags = ['Movies']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Update a movie based on id',
      required: true,
      schema: { $ref: '#/definitions/Movie' }
  } */
  try{
    const movieId = req.params.id
    const movieData = req.body
    if(!movieData.title || !movieData.director|| !movieData.releaseYear || !movieData.genre || !movieData.rating || !movieData.duration || !movieData.cast){
      throw new Error('All the fields must be included')
    }
    const updatedMovie = await moviesModel.updateAMovie(movieId, movieData)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({message:'Movie was updated succesfully', id: updatedMovie._id})
  }catch(err) {
    res.status(500).json({message: err.message || 'A server error occured.'})
  }
}

const removeAMovie = async (req, res) =>{
  //#swagger.tags = ['Movies']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Delete a movie from list',
      required: true,
      schema: { $ref: '#/definitions/Movie' }
  } */
  const deletedMovie = await moviesModel.deleteAMovie(req.params.id);
  res.setHeader('Content-Type', 'application/json');
  
  if (deletedMovie.error) {
    return res.status(400).json(deletedMovie); // Send the error message from the model function
  }

  res.status(200).json(deletedMovie);
  // try{
  //   const movieId = req.params.id
  //   const deletedMovie = moviesModel.deleteAMovie(movieId)
  //   res.setHeader('Content-Type', 'application/json')
  //   res.status(200).json(deletedMovie)
  // }catch(err){
  //   res.status(500).json({error: err.message})
  // }
}

module.exports = { listAllMovies, insertAMovie, modifyAMovie, removeAMovie }
