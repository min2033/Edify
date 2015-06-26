var db = require('../dbConfig');
require('./skill');
require('./user');
require('./likeLearner');

var LearnSkill = db.Model.extend({
  tableName: 'users_learn_skills',
  hasTimestamps: true,

  skill: function() {
    return this.belongsTo('Skill', 'skill_id');
  },

  user: function() {
    return this.belongsTo('User', 'user_id');
  },

  likeLearner: function () {
    return this.belongsToMany('LikeLearner', 'users_like_learners');
  },
  
});

module.exports = db.model('LearnSkill', LearnSkill);
