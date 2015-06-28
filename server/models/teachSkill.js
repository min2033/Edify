var db = require('../dbConfig');
require('./skill');
require('./user');


//////////////////////////////////////////////////////////////////
// Require statement for incomplete feature: UPVOTING OTHER USERS
//
require('./likeTeacher');
//////////////////////////////////////////////////////////////////


var TeachSkill = db.Model.extend({
  tableName: 'users_teach_skills',
  hasTimestamps: true,

  skill: function() {
    return this.belongsTo('Skill', 'skill_id');
  },

  user: function() {
    return this.belongsTo('User', 'user_id');
  },


  ///////////////////////////////////////////////////////////////////
  // Relations functions for incomplete feature: UPVOTING OTHER USERS
  // 
  likeTeacher: function () {
    return this.belongsToMany('LikeTeacher', 'users_like_teachers');
  }
  ///////////////////////////////////////////////////////////////////


});

module.exports = db.model('TeachSkill', TeachSkill);
