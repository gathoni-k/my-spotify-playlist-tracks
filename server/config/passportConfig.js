const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
require('dotenv').config()
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(
    new SpotifyStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/callback'
        },
        (accessToken, refreshToken, expires_in, profile,done) => {
            process.nextTick(() => {
                console.log(accessToken)
                let user = {
                    userId: profile.id,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                return done(null,user)
            })
        }
    )
)
