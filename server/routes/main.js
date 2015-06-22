var express = require('express');
var userController = require('../controllers/userController');
var skillController = require('../controllers/skillController');
var router = express.Router();

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('rejected');
  res.redirect('/');
};

router.get('/api/profile', ensureAuthenticated, function(req,res,next){
  userController.getUser(req, res, next, {github_id:req.user.id});
});

router.get('/api/users/:username', ensureAuthenticated, function(req,res,next){
// router.get('/api/users/:username', function(req,res,next){
  var user = req.params.username;
  userController.getUser(req, res, next, {username:user}); // ends res with result
});

router.get('/api/skills/:skillname',function(req,res,next){
  var skill = req.params.skillname;
  skillController.getSkill(req,res,next,skill); // ends res with result
});

router.get('/api/skills/',function(req,res,next){ // get all skills
  var skill = req.params.skillname;
  skillController.allSkills(req,res,next); // ends res with result
});

router.get('/logout', function(req, res) {
  console.log('logging out user...');
  req.logout(); // passport - destroys session
  res.redirect('/');
});



module.exports = router;
