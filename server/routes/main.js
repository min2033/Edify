var express = require('express');
var userController = require('../controllers/userController');
var skillController = require('../controllers/skillController');
var router = express.Router();

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('rejected');
  res.redirect('/');
};

// Gets user profile
router.get('/api/profile', ensureAuthenticated, function(req,res,next){
  userController.getUser(req, res, next, {github_id:req.user.id});
});

//Update user profile
router.put('/api/profile', ensureAuthenticated, function(req,res,next){
  //req.body = { blurb: 'sometext', userId: 4}
  userController.updateUser(req, res, next);
});

// Gets another user's profile & skills
router.get('/api/users/:username', ensureAuthenticated, function(req,res,next){
// router.get('/api/users/:username', function(req,res,next){
  var user = req.params.username;
  userController.getUser(req, res, next, {username:user});
});

// Gets all users with username
router.get('/api/users/', function(req,res,next){
// router.get('/api/users/:username', function(req,res,next){
  userController.allUsers(req, res, next);
});

// Fetch individual skill with its learners and teachers
router.get('/api/skills/:skillname',function(req,res,next){
  var skill = req.params.skillname;
  skillController.getSkill(req,res,next,skill);
});

// Fetch all skills with learners and teachers
router.get('/api/skills/',function(req,res,next){
  skillController.allSkills(req,res,next);
});

// User says I want to delete this skill
router.post('/api/skills/delete/', ensureAuthenticated, function(req,res,next){
  //req.body = { type: 'teach', skillId: 2, userId: 3 }
  skillController.deleteSkill(req,res);
});

// User says I want to learn/teach this skill
router.post('/api/skills/', ensureAuthenticated, function(req,res,next){
  //req.body = { type: 'teach', skill: 'javascript', skilllevel: 3, userId: 3, blurb: 'something' }
  skillController
    .findOrCreate(req) // skillId is added on to req.body
    .then(function(data){
      skillController.update(data.body,res,next); // create an entry in teach/learn join tables
    });
});


router.get('/logout', function(req, res) {
  console.log('logging out user...');
  req.logout(); // passport - destroys session
  res.redirect('/');
});



module.exports = router;
