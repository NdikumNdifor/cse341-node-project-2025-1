const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const {AccountModel} = require('../models/movieSchema-model')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("GitHub Profile Data:", profile)
    // Note, mongoose does not have 'findOneOrCreate' method 
    // so will not work here (works for mongoClient). But can install a pluging to use that.
    // AccountModel.findOrCreate({ githubId: profile.id }, function (err, account) {return cb(err, account);});
    const newAccount = {
      githubId: profile.id,
      displayName: profile.displayName || profile.username,
      firstName: profile.name?.givenName || "",
      lastName: profile.name?.familyName || "",
      email: profile.emails?.[0]?.value || "",
      image: profile.photos?.[0]?.value || ""
    }
    try{
      let account = await AccountModel.findOne({githubId: profile.id})
      if(account){
        done(null, account)
      }else{
        account = await AccountModel.create(newAccount)
        done(null, account)
      }
    }catch(err){
      console.error("GitHub authentication error:", err)
      done(err, null)
    }

  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// const newAccount = {
//   githubId: profile.Id,
//   displayName: profile.displayName,
//   firstName: profile.name.givenName,
//   lastName: profile.name.familyName,
//   image: profile.photo[0].value
// }
// try{
//   let account = await AccountModel.findOne({githubId: profile.id})
//   if(account){
//     done(null, account)
//   }else{
//     account = await AccountModel.create(newAccount)
//     done(null, account)
//   }
// }catch(err){
//   throw new Error("An error occured")
// }


// passport.deserializeUser((id, done) => {
//   AccountModel.findById(id, (err, account) => done(err, account))
// })


// app.get('/', (req, res) =>{res.send(req.session.account != undefined ? `Logged in as ${req.session.account.displayName}`: "Logged Out")})

// app.get('/github/callback', passport.Authenticator('github', {
//     failureRedirect: '/api-docs', session: false}),
//     (req, res) => {
//         req.session.account = req.account
//         res.redirect('/')
//     })