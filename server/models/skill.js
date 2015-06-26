var db = require('../dbConfig');
require('./user');
var TeachSkill = require('./teachSkill');
var LearnSkill = require('./learnSkill');
var LikeTeacher = require('./likeTeacher');
var LikeLearner = require('./likeLearner');

var Skill = db.Model.extend({
  tableName: 'skills',
  hasTimestamps: true,

  teachers: function () {
    return this.belongsToMany('User', 'users_teach_skills').withPivot(['skill_level','blurb','stars']);
  },

  learners: function () {
    return this.belongsToMany('User', 'users_learn_skills').withPivot(['skill_level','blurb','stars']);
  },

  likedTeachers: function () {
    return this.belongsToMany('LikeTeacher', 'users_like_teachers');
  },

  likedLearners: function () {
    return this.belongsToMany('LikeLearner', 'users_like_learners');
  },

  // likedTeachers: function () {
  //   return this.belongsToMany('User', 'users_like_teachers').withPivot(['teacher_name']);
  // },

  // likedLearners: function () {
  //   return this.belongsToMany('User', 'users_like_learners').withPivot(['learner_name']);
  // },

  initialize: function () {
    // Place for creating event listener
    // e.g. this.on('creating', function(model, attrs, options){

  }

});


module.exports = db.model('Skill', Skill);
