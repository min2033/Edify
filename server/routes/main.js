var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};


router.get('/users', ensureAuthenticated, function(req,res){
  var user = req.body.user;
  userController.getUser(req,res,next,user); // ends res with result
});


router.get('/skills',function(req,res){


});

router.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/signin');
  });
});

router.get('/restricted',function(req,res){
  console.log('got thru fine');
});

module.exports = router;
