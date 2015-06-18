var db = require('../dbConfig');
var Skill = require('../models/skill');

var Skills = new db.Collection();

Skills.model = Skill;

module.exports = Skills;
