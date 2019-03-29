const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = require('express')();
const { User } = require('./user.model');
const mongoose = require('mongoose');

void function main() {
    dotenv.config();
    const port = +(process.env.PORT || 8080);
    mongoose.connect(`mongodb://${process.env.AUTHDB}`, { useNewUrlParser: true });
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://0.0.0.0/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google', passport.authenticate('google', { 
        scope: ['https://www.googleapis.com/auth/plus.login'] 
    }));

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback', 
        passport.authenticate('google',
            { failureRedirect: 'http://server/login-failed' }
        ),
        function (req, res) {
            res.redirect('http://server');
        }
    );
    app.listen(port, () => {
        console.log(`[AUTH]: Listening on port: ${port}`);
    });
}();
