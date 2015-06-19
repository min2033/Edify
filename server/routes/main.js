var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();


router.get('/users',function(req,res){
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