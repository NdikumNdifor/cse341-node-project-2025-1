const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://sebastien:nininini03@cluster1.zkh2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;