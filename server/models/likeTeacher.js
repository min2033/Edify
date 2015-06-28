//////////////////////////////////////////////////////////////
// Database Model for incomplete feature: UPVOTING OTHER USERS
//                use only for building out this feature
//
var db = require('../dbConfig');
require('./skill');
require('./user');
require('./teachSkill');


var LikeTeacher = db.Model.extend({
  tableName: 'users_like_teachers',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo('User', 'voter_id');
  },

  skill: function() {
    return this.belongsTo('TeachSkill', 'teach_skill_id');
  },

  teacher: function() {
    return this.belongsTo('TeachSkill', 'teacher_id');
  }

});

module.exports = db.model('LikeTeacher', LikeTeacher);
//////////////////////////////////////////////////////////////