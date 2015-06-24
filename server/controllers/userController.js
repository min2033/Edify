var User = require('../models/user');
var Promise = require('bluebird');


module.exports = {

  getUser: function (req, res, next, params) { // params = {username: username}
    new User(params)
      .fetch({
        withRelated: ['teachSkills', 'learnSkills']
      })
      .then(function (user) {
        var result = {};

        result.username = user.attributes.username;
        result.email = user.attributes.email;
        result.githubId = user.attributes.github_id;
        result.id = user.attributes.id;
        result.blurb = user.attributes.blurb;
        result.avatar = user.attributes.avatar;

        result.learnSkills = [];
        user.relations.learnSkills.models.forEach(function (item) {
          result.learnSkills.push({
            id: item.attributes.id,
            skill_name: item.attributes.skill_name,
            skill_level: item.pivot.attributes.skill_level,
            blurb: item.pivot.attributes.blurb
          });
        });

        result.teachSkills = [];
        user.relations.teachSkills.models.forEach(function (item) {
          result.teachSkills.push({
            id: item.attributes.id,
            skill_name: item.attributes.skill_name,
            skill_level: item.pivot.attributes.skill_level,
            blurb: item.pivot.attributes.blurb
          });
        });
        // console.log(result);

        res.status(200).send(result);
      });
  },

  allUsers: function(req,res,next){
    new User()
      .fetchAll()
      .then(function(users){
        res.send(users);
      });
  },

  updateUser: function(req,res,next){
    var data = req.body; // { blurb: 'sometext', userId: 4}
    console.log(data);

    new User({id: data.userId})
      .fetch()
      .then(function(item){ // check if already exists, update if exist
        if(item){
          item.attributes.blurb = data.blurb;
          item.save().then(function(){
            console.log('update complete!');
            res.send(data);
          });
        }else{
          res.send('no user found');
        }
      });
  },

  findOrCreate: function(user) {
    return new Promise(function(resolve, reject) {

      new User({ github_id: user.githubId })
        .fetch().then(function (found) {
          if (found) {
            resolve(found);
          } else {
            // add user to db
            var newUser = new User({
              username: user.username,
              email: user.email,
              github_id: user.githubId,
              avatar: user.avatar,
              blurb: ''
            });
            newUser.save().then(resolve).catch(reject);

          }
        });
    });
  }




};
