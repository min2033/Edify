var User = require('../models/user');


module.exports = {
  getUser: function (req, res, next, username) {
    new User({ username: username })
      .fetch({
        withRelated: ['teachSkills', 'learnSkills']
      })
      .then(function (user) {
        var result = {};

        result.username = user.username;
        result.email = user.email;
        result.github_id = user.github_id;

        result.learnSkills = [];
        user.relations.learnSkills.models.forEach(function (item) {
          result.learnSkills.push(item.attributes);
        });

        result.teachSkills = [];
        user.relations.teachSkills.models.forEach(function (item) {
          result.teachSkills.push(item.attributes);
        });

        res.send(200, result);
      });
  },






};
