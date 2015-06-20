var express = require('express');
var userController = require('../controllers/userController');
var skillController = require('../controllers/skillController');
var router = express.Router();

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('rejected');
  res.redirect('/login');
};


// router.get('/api/users/:username', ensureAuthenticated, function(req,res,next){
router.get('/api/users/:username', function(req,res,next){
  var user = req.params.username;

  userController.getUser(req, res, next, user); // ends res with result
});


router.get('/api/skills/:skillname',function(req,res,next){
  var skill = req.params.skillname;

  skillController.getSkill(req,res,next,skill); // ends res with result
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/signin');
  });
});



module.exports = router;
