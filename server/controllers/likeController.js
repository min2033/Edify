var LikeTeacher = require('../models/likeTeacher');
var LikeLearner = require('../models/likeLearner');
var Promise = require('bluebird');


module.exports = {

  getLikeTeachers: function (req, res, next, params) {

    new LikeTeacher()
      .fetchAll({
        withRelated: ['skill', 'teacher']
      })
      .then(function (votes) {
        // console.log('votes', votes);

        var result = votes.models;

        // result.id = votes.attributes.id;
        // result.voter_id = votes.attributes.voter_id;
        // votes.relations.skill.models.forEach(function (item) {
        //   result.teacher_id = item.attributes.user_id;
        //   result.teach_skill_id = item.attributes.skill_id;
        // });

        // console.log(result);

        res.status(200).send(result);
      });
  }

  // getLikeLearners : function (req, res, next, params) {

  // }

};
