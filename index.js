// Dependencies
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// App Configuration
const app = express();

// Authentication
passport.use(new GoogleStrategy({

		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/cb'

	}, 
	(accessToken, refreshToken, profile, done) => {

		console.log('access token: ', accessToken);
		console.log('refresh token: ', refreshToken);
		console.log('profile: ', profile);

	})
);

//Route Handlers
app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);
app.get('/auth/google/cb', passport.authenticate('google'));


// App Listener
const PORT = process.env.PORT || 8080;
app.listen(PORT);