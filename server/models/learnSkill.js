var db = require('../dbConfig');
require('./skill');
require('./user');


var LearnSkill = db.Model.extend({
  tableName: 'users_learn_skills',
  hasTimestamps: true,

  skill: function() {
    return this.belongsTo('Skill', 'skill_id');
  },

  user: function() {
    return this.belongsTo('User', 'user_id');
  }
});

module.exports = db.model('LearnSkill', LearnSkill);
