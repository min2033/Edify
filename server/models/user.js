var db = require('../dbConfig');
require('./skill');
var TeachSkill = require('./teachSkill');
var LearnSkill = require('./learnSkill');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,


  teachSkills: function () {
    return this.belongsToMany('Skill').through(TeachSkill);
  },

  learnSkills: function () {
    return this.belongsToMany('Skill').through(LearnSkill);
  },

  initialize: function () {
    // Place for creating event listener
    // e.g. this.on('creating', function(model, attrs, options){

  }

});


module.exports = db.model('User', User);
