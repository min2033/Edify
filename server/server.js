var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 8000;

// OAuth - Github
var passport = require('passport');
var config = require('./oauth.js')
var GithubStrategy = require('passport-github2').Strategy;

// OAuth - Serialize and Deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// OAuth - Github Strategy
passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    // See below - when we have our DB up and running.
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null,profile); // - this is temporary code.
  }
));

// OAuth Required Libraries.
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve our ../client files.
app.use('/',express.static(path.join(__dirname, '../client')));

// Github OAuth
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

// Github OAuth Callback
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('good to go');
    res.send('good');
    // res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.listen(port,function(err){
  console.log('app listening on...' + port);

});