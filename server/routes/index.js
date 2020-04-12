const express = require('express')
const router = express.Router()
const passport = require('passport')

// login route
router.get('/auth/spotify', passport.authenticate('spotify'));

// callback url
router.get(
    '/callback',
    passport.authenticate('spotify', { 
        failureRedirect: "/",
        scope: ['playlist-read-private', 'playlist-read-collaborative']
        }),
    function(req, res, next) {
        // Successful authentication, redirect to client.
        res.redirect('http://localhost:8080/');
    }
);

//   serve user info
router.get('/user', (req, res) =>{
    if(req.user === undefined){
        res.json({})
    } else {
        res.json({
            user: req.user
        })
    }
})

module.exports = router