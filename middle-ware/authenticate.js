const isAuthenticated = (req, res, next) => {
    if ( req.session.user === undefined) {
        return res.status(401).json({error: "Unauthorized acces, Please log"})
    }
    next() // check if next takes bracket
}

module.exports = {isAuthenticated}