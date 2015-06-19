var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/signin');
  });
});

router.get('/restricted',function(req,res){
  console.log('got thru fine');
});

module.exports = router;