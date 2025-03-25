const mongoose = require('mongoose')
require('dotenv').config() // Load environment variables from .env file

const mongoURI = process.env.MONGODB_URI
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('MongoDB Connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
