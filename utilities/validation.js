const { body, validationResult } = require('express-validator')
const validate = {}

/*  **********************************
 *  Movies Data Validation Rules
 * ********************************* */
validate.createMovieRules = () => {
  return [
    // Title is required and must be a string
    body('title')
      .isString()
      .withMessage('Title must be a string.')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide the title.')
      .isLength({ min: 1 })
      .withMessage('Title must be at least 1 character long.'),

    // Director is required and must be a string
    body('director')
      .isString()
      .withMessage('Director must be a string.')
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide the director's name.")
      .isLength({ min: 2 })
      .withMessage("Director's name must be at least 2 characters long."),

    // Release Year is required and must be a valid integer
    body('releaseYear')
      .trim()
      .notEmpty()
      .withMessage("Please provide the movie's release year.")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage(
        'Release year must be a valid year between 1900 and the current year.'
      ),

    // Genre is required and must be a string
    body('genre')
      .isString()
      .withMessage('Genre must be a string.')
      .trim()
      .notEmpty()
      .withMessage('Please enter the genre.')
      .isLength({ min: 2 })
      .withMessage('Genre must be at least 2 characters long.'),

    // Rating is required and must be a number between 0 and 10
    body('rating')
      .notEmpty()
      .withMessage('Please provide a rating.')
      .isFloat({ min: 0, max: 10 })
      .withMessage('Rating must be a number between 0 and 10.'),

    // Duration is required and must be a positive integer
    body('duration')
      .notEmpty()
      .withMessage('Please provide the duration in minutes.')
      .isInt({ min: 1 })
      .withMessage('Duration must be a positive integer (in minutes).'),

    // Cast is required and must be an array of strings
    body('cast')
      .isArray({ min: 1 })
      .withMessage('Please provide at least one cast member.')
      .custom((value) => value.every((c) => typeof c === 'string'))
      .withMessage('Each cast member must be a string.')
  ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkCreateMovieData = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors
  })
}

/* **********************************
 *  User Data Validation Rules
 * ********************************* */
validate.creategenreRules = () => {
  return [
    // genreName is required and must be a string
    body('genreName')
      .isString()
      .withMessage('Genre name must be a string.')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a genre name.')
      .isLength({ min: 2 })
      .withMessage('Genre name must be at least 2 characters long.'),

    // description is required and must be a string
    body('description')
      .isString()
      .withMessage('Description must be a string.')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a description.')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long.'),

    // popularMovies should be an array of strings
    body('popularMovies')
      .isArray({ min: 1 })
      .withMessage('Please provide at least one popular movie.')
      .custom((value) => value.every((m) => typeof m === 'string'))
      .withMessage('Each popular movie must be a string.'),

    // subGenres should be an array of strings
    body('subGenres')
      .isArray({ min: 1 })
      .withMessage('Please provide at least one sub-genre.')
      .custom((value) => value.every((s) => typeof s === 'string'))
      .withMessage('Each sub-genre must be a string.')
  ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkCreategenreData = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors
  })
}

module.exports = validate

//   validate.checkRegData = async (req, res, next) => {
//     const {title, director, releaseYear, genre, rating, duration, cast } = req.body
//     let errors = []
//     errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       let nav = await utilities.getNav()
//       let finalNav = await utilities.getCategoryNavigation()
//       res.render("account/register", {
//         errors,
//         title: "Registration",
//         nav,
//         finalNav,
//         account_firstname,
//         account_lastname,
//         account_email,
//       })
//       return
//     }
//     next()
//   }
