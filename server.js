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

const session = require('express-session')
const passport = require('passport')

require('./auth-github/passport')

// Start server
const port = process.env.PORT || 8080
const app = express()

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRETE,
  resave: false,
  saveUninitialized: true
}))
// Passport middleware (has to be placed below session middleware)
app.use(passport.initialize())
// init passport on every route call
app.use(passport.session())
// Allow passport to use 'express-session'

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
app.use(cors()) // Enable CORS for all requests

const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAutogen))

// Define routes
// app.get('/', (req, res) => {
//   res.send('Looking good so far!')
// })

app.use('/', require('./routes'))

// Connect to MongoDB
connectDB()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
