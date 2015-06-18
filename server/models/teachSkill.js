var db = require('../dbConfig');
require('./skill');
require('./user');


var TeachSkill = db.Model.extend({
  tableName: 'users_teach_skills',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('Skill', 'skill_id');
  },

  skill: function() {
    return this.belongsTo('User', 'user_id');
  }
});

module.exports = db.model('TeachSkill', TeachSkill);
