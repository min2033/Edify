var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var userController = require('../controllers/userController');

// OAuth - Github
var passport = require('passport');
var config = require('../oauth.js')
var GithubStrategy = require('passport-github2').Strategy;

// OAuth - Serialize and Deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// OAuth - Github Strategy
passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      userController.findOrCreate({
        username: profile.username,
        email: profile.emails[0].value,
        githubId: profile.id,
        avatar: profile._json.avatar_url
      }).then(function() {
        return done(null, profile);
      });

    });
  }));

router.all('*',function(req,res,next){
  console.log('reqest to ' + req.method + 'req to: ' + req.url);
  next();
});

// Github OAuth
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Github OAuth Callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(!!req.user); // logs true if login is good.
    res.redirect('/');
  });

module.exports = router;
