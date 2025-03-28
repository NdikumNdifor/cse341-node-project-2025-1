const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  Registration Data Validation Rules
* ********************************* */
validate.createMovieRules = () => {
  return [
      // Title is required and must be a string
      body("title")
          .isString()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Please provide the title.")
          .isLength({ min: 1 })
          .withMessage("Title must be at least 1 character long."), 

      // Director is required and must be a string
      body("director")
          .isString()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Please provide the director's name.")
          .isLength({ min: 2 })
          .withMessage("Director's name must be at least 2 characters long."), 

      // Release Year is required and must be a valid integer
      body("releaseYear")
          .trim()
          .notEmpty()
          .withMessage("Please provide the movie's release year.")
          .isInt({ min: 1900, max: new Date().getFullYear() })
          .withMessage("Release year must be a valid year between 1900 and the current year."),

      // Genre is required and must be a string
      body("genre")
          .isString()
          .trim()
          .notEmpty()
          .withMessage("Please enter the genre.")
          .isLength({ min: 2 })
          .withMessage("Genre must be at least 2 characters long."),

      // Rating is required and must be a number between 0 and 10
      body("rating")
          .notEmpty()
          .withMessage("Please provide a rating.")
          .isFloat({ min: 0, max: 10 })
          .withMessage("Rating must be a number between 0 and 10."),

      // Duration is required and must be a positive integer
      body("duration")
          .notEmpty()
          .withMessage("Please provide the duration in minutes.")
          .isInt({ min: 1 })
          .withMessage("Duration must be a positive integer (in minutes)."),

      // Cast is required and must be an array of strings
      body("cast")
          .isArray({ min: 1 })
          .withMessage("Please provide at least one cast member.")
          .custom((value) => value.every(c => typeof c === "string"))
          .withMessage("Each cast member must be a string."),
  ];
};


/* ******************************
* Check data and return errors or continue to registration
* ***************************** */
validate.checkCreateMovieData = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
  return res.status(400).json({
    errors: extractedErrors,
  })
}
  
module.exports = validate;
  


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