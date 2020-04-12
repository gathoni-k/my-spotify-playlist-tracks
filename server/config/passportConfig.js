const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
require('dotenv').config()
// require credentials
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

// serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//   use spotify strategy
passport.use(
    new SpotifyStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/callback'
        },
        (accessToken, refreshToken, expires_in, profile,done) => {
            process.nextTick(() => {
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
