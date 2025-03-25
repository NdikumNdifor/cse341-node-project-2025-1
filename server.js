/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require('express')
const connectDB = require('./database/connection') // Import the database connection
require('dotenv').config() // Load environment variables

const app = express()

// Middleware
app.use(express.json())

// Define routes
app.get('/', (req, res) => {
  res.send('Looking good so far!')
})

app.use('/', require('./routes'))

// Connect to MongoDB
connectDB()

// Start server
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
