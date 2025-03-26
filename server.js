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

// Start server
const port = process.env.PORT || 8080
const app = express()

const bodyParser = require('body-parser');
const cors = require('cors'); 

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
app.use(cors()) // Enable CORS for all requests

const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAutogen));

// Define routes
app.get('/', (req, res) => {
  res.send('Looking good so far!')
})

app.use('/', require('./routes'))

// Connect to MongoDB
connectDB()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
