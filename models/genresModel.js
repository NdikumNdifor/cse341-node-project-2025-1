const {userModel} = require('./movieSchema-model')
const { ObjectId } = require('mongodb');

const getAllUsers = async () => {
  try {
    const result = await userModel.find()
    if (!result || result.length === 0) {
      throw new Error('Sorry, no user was found.')
    }
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

const addASingleUser = async (objectData) => {
  try{
    const {genreName, description, popularMovies, subGenres  } = objectData
    if(!genreName || !description || !popularMovies || !subGenres){
    throw new Error('All the fields must be present')
    }
    const result = await userModel.create(objectData)
    return result

  }catch(err){
    throw new Error(err.message)
  }
}


const updateAUser = async (userId, userData) => {
  try{
    if(!ObjectId.isValid(userId)){
      throw new Error('Your movie ID is incorrect')
    }
    // const {title, director, releaseYear, genre, rating, duration, cast} = movieData
    const result = await userModel.findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: userData }, {new: true})
    if(result.matchedCount === 0){
      return {message: 'No user was found with this ID'}
    }
    if(result.modifiedCount ===0){
      return {message: 'No changes made, the contact data is already up to date.'}
    }
    return {
      message: 'Contact updated successfully',
      modifiedCount: result.modifiedCount
    }
  }catch(err){
    console.error(err.message)
    return {err: err.message}
  }
}

const deleteAUser = async (userId) => {
  try{
    if(!ObjectId.isValid(userId)){
      throw new Error('No contact found with the given ID')
    }
    const result = await userModel.findOneAndDelete({_id: new ObjectId(userId)})
    if(!result) {
      throw new Error('No contact was deleted.')
    }
    return {
      message: 'Contact deleted succesfully',
      deletedUser: result
    }
  }catch(err) {
    console.error(err.message)
    return {error: err.message}
  }
}

module.exports = { userModel, getAllUsers, addASingleUser, updateAUser, deleteAUser}