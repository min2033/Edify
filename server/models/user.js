var db = require('../dbConfig');
require('./skill');
var TeachSkill = require('./teachSkill');
var LearnSkill = require('./learnSkill');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  teachSkills: function () {
    return this.belongsToMany('Skill', 'users_teach_skills').withPivot(['skill_level']);
  },

  learnSkills: function () {
    return this.belongsToMany('Skill', 'users_learn_skills').withPivot(['skill_level']);
  },

  initialize: function () {
    // Place for creating event listener
    // e.g. this.on('creating', function(model, attrs, options){

  }

});


module.exports = db.model('User', User);
