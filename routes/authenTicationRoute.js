const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) =>{res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged Out")})

// router.get('/auth/github', passport.authenticate('github'))// troubleshoot

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        //When a user logs in, Passport stores the githubId in the session (serializeUser).
        //Later, Passport retrieves the full user account from the database and automatically assigns it to
        //req.user (deserializeUser). Because of this, req.user is always available after a successful authentication.
        req.session.user = req.user // Ensure session is properly set(Passport automatically sets req.user when authentication is successful.)
        res.redirect('/')
    })

// router.get('/login', passport.authenticate('github'), (req, res) => {})
router.get('/login', passport.authenticate('github'))

// router.get('/logout', function(req, res, next){
//     req.logout(function(err){
//         if (err) {return next(err)}
//         res.redirect('/')
//     })
// })

router.get('/logout', (req, res) => {
    req.logout(function(err){
        if (err) return res.status(500).send("Error logging out.");
        
        // Destroy the session
        req.session.destroy((err) => {
            if (err) return res.status(500).send("Error ending session.");
            console.log("Session stii lives!")

            // res.clearCookie('connect.sid'); // Clear session cookie
            res.redirect('/');
        });
    });
});

module.exports = router


// function isLoggedIn(req, res, next){
//     req.user? next() : res.status(401)
// } 

// router.get('/auth/github',
//     passport.authenticate('github', { scope: ['email', 'profile']})
// )

// router.get('/github/callback',
//     passport.authenticate('github', {
//         successRedirect: '/api-docs', isLoggedIn,
//         failureRedirect: '/auth/failure'
//     })
// )

// router.get('/auth/failure', (req, res) =>{
//     res.send("Something went wrong..")
// })
