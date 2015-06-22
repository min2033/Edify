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
        result.avatar = req.user._json.avatar_url; // this is only for user.

        result.learnSkills = [];
        user.relations.learnSkills.models.forEach(function (item) {
          result.learnSkills.push({
            id: item.attributes.id,
            skill_name: item.attributes.skill_name,
            skill_level: item.pivot.attributes.skill_level
          });
        });

        result.teachSkills = [];
        user.relations.teachSkills.models.forEach(function (item) {
          result.teachSkills.push({
            id: item.attributes.id,
            skill_name: item.attributes.skill_name,
            skill_level: item.pivot.attributes.skill_level
          });
        });
        // console.log(result);

        res.status(200).send(result);
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
              github_id: user.githubId
            });
            newUser.save().then(resolve).catch(reject);

          }
        });
    });
  }




};
