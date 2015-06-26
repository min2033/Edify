var db = require('../dbConfig');
require('./skill');
require('./user');
require('./learnSkill');


var LikeLearner = db.Model.extend({
  tableName: 'users_like_learners',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'voter_id');
  },

  skill: function() {
    return this.belongsTo('LearnSkill', 'learn_skill_id');
  },

  learner: function() {
    return this.belongsTo('LearnSkill', 'learner_id');
  }

});

module.exports = db.model('LikeLearner', LikeLearner);
