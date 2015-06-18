var db = require('../dbConfig');
require('./user');
require('./learnSkill');
require('./teachSkill');

var Skill = db.Model.extend({
  tableName: 'skills',
  hasTimestamps: true,


  teachers: function () {
    return this.belongsToMany('User').through('TeachSkill');
  },

  learners: function () {
    return this.belongsToMany('User').through('LearnSkill');
  },

  initialize: function () {
    // Place for creating event listener
    // e.g. this.on('creating', function(model, attrs, options){

  }

});


module.exports = db.model('Skill', Skill);
