var User = require('../models/user');
var Promise = require('bluebird');


module.exports = {
  getUser: function (req, res, next, username) {
    new User({ username: username })
      .fetch({
        withRelated: ['teachSkills', 'learnSkills']
      })
      .then(function (user) {
        var result = {};
        console.log(user);

        result.username = user.attributes.username;
        result.email = user.attributes.email;
        result.githubId = user.attributes.github_id;

        result.learnSkills = [];
        user.relations.learnSkills.models.forEach(function (item) {
          result.learnSkills.push(item.attributes);
        });

        result.teachSkills = [];
        user.relations.teachSkills.models.forEach(function (item) {
          result.teachSkills.push(item.attributes);
        });
        console.log(result);

        res.send(200, result);
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
