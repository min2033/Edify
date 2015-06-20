var Skill = require('../models/skill');
var Promise = require('bluebird');


module.exports = {
  getSkill: function (req, res, next, skillname) {
    new Skill({ skill_name: skillname })
      .fetch({
        withRelated: ['teachers', 'learners']
      })
      .then(function (skill) {
        var result = {};
        console.log(skill);

        result.skill_name = skill.attributes.skill_name;

        result.learners = [];
        skill.relations.learners.models.forEach(function (item) {
          result.learners.push(item.attributes);
        });

        result.teachers = [];
        skill.relations.teachers.models.forEach(function (item) {
          result.teachers.push(item.attributes);
        });

        console.log(result);

        res.send(200, result);
      });
  },

  allSkills: function (req, res, next) {
    new Skill()
      .fetchAll({
        withRelated: ['teachers', 'learners']
      })
      .then(function (skills) {
        var result = {};

        var models = skills.models;

        for (var i = 0; i < models.length; i++) {
          var skill = models[i];
          result[skill.attributes.skill_name] = {learners: [],teachers:[]};

          skill.relations.learners.models.forEach(function (item) {
            result[skill.attributes.skill_name].learners.push(item.attributes);
          });

          skill.relations.teachers.models.forEach(function (item) {
            result[skill.attributes.skill_name].teachers.push(item.attributes);
          });

        };

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
