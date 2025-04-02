const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  duration: { type: Number, required: true },
  cast: { type: [String], required: true }
})

const genreShcema = new mongoose.Schema({
  genreName: { type: String, required: true },
  description: { type: String, required: true },
  popularMovies: { type: [String], required: true, default: [] },
  subGenres: { type: [String], required: true, default: [] }
})

const accountSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: function() { return !this.githubId; }  // Required if NOT a GitHub user
    },
  password: { type: String }, // Only for manually registered users
  githubId: { type: String }, // Only for Google OAuth users
  displayName: { type: String }, // For OAuth users (Google, GitHub, etc.)
  firstName: { type: String },
  lastName: { type: String },
  profileImage: { type: String }, // Optional: URL from OAuth provider
  createdAt: { type: Date, default: Date.now },
  accountType: {
    type: String,
    enum: ["Admin", "Client", "Employee"],
    default: "Client",
    required: true
  }

})

// Ensure `password` is only required when NOT using OAuth
accountSchema.pre("validate", function (next) {
  if (!this.githubId && !this.password) {
    next(new Error("Either password or googleId is required"));
  } else {
    next();
  }
});

const MovieModel = mongoose.model('movies', movieSchema)
const userModel = mongoose.model('genres', genreShcema)
const AccountModel = mongoose.model('accounts', accountSchema)

module.exports = { MovieModel, userModel, AccountModel }
