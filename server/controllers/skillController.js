var Skill = require('../models/skill');
var Promise = require('bluebird');
var LearnSkill = require('../models/learnSkill');
var TeachSkill = require('../models/teachSkill');

module.exports = {
  getSkill: function (req, res, next, skillname) {
    new Skill({ skill_name: skillname })
      .fetch({
        withRelated: ['teachers', 'learners']
      })
      .then(function (skill) {
        var result = {};

        result.skill_name = skill.attributes.skill_name;
        result.skill_id = skill.attributes.id;
        result.skill_description = skill.attributes.skill_description;

        result.learners = [];
        skill.relations.learners.models.forEach(function (item) {
          result.learners.push({
            id: item.attributes.id,
            username: item.attributes.username,
            avatar: item.attributes.avatar,
            zip: item.attributes.zip,
            skill_level: item.pivot.attributes.skill_level,
            blurb: item.pivot.attributes.blurb,
            stars: item.pivot.attributes.stars
          });
        });

        result.teachers = [];
        skill.relations.teachers.models.forEach(function (item) {
          result.teachers.push({
            id: item.attributes.id,
            username: item.attributes.username,
            avatar: item.attributes.avatar,
            zip: item.attributes.zip,
            skill_level: item.pivot.attributes.skill_level,
            blurb: item.pivot.attributes.blurb,
            stars: item.pivot.attributes.stars
          });
        });

        res.status(200).send(result);
      });
  },

  allSkills: function (req, res, next) {
    new Skill()
      .fetchAll({
        withRelated: ['teachers', 'learners']
      })
      .then(function (skills) {
        var result = {};

        var models = skills.models;

        for (var i = 0; i < models.length; i++) {
          var skill = models[i];
          result[skill.attributes.skill_name] = {learners: [],teachers:[]};
          result[skill.attributes.skill_name].skill_id = skill.attributes.id;
          result[skill.attributes.skill_name].skill_description = skill.attributes.skill_description;

          skill.relations.learners.models.forEach(function (item) {
            result[skill.attributes.skill_name].learners.push({
              id: item.attributes.id,
              username: item.attributes.username,
              avatar: item.attributes.avatar,
              zip: item.attributes.zip,
              skill_level: item.pivot.attributes.skill_level,
              blurb: item.pivot.attributes.blurb,
              stars: item.pivot.attributes.stars
            });
          });

          skill.relations.teachers.models.forEach(function (item) {
            result[skill.attributes.skill_name].teachers.push({
              id: item.attributes.id,
              username: item.attributes.username,
              avatar: item.attributes.avatar,
              zip: item.attributes.zip,
              skill_level: item.pivot.attributes.skill_level,
              blurb: item.pivot.attributes.blurb,
              stars: item.pivot.attributes.stars
            });
          });

        };
        res.status(200).send(result);
      });
  },

  findOrCreate: function(req) {
    return new Promise(function(resolve, reject) {
      new Skill({ skill_name: req.body.skill })
        .fetch().then(function (found) {
          if (found) {
            req.body.skillId = found.attributes.id;
            resolve(req);
          } else {
            // add skill to db
            var newSkill = new Skill({
              skill_name: req.body.skill,
            });
            newSkill.save()
            .then(function(){
              req.body.skillId = newSkill.attributes.id;
              resolve(req);
            }).catch(reject);
          }
        });
    });
  },

  update: function(data,res,next) { // either update skillLevel or add
    //data = { type: teach, skill: javascript, skillLevel: 3, userId: 3, skillId: 5}
    console.log(data);
    if(data.type === "teach"){
      new TeachSkill({skill_id: data.skillId, user_id: data.userId})
        .fetch()
        .then(function(item){ // check if already exists, update if exist
          if(item){
            if(data.skillLevel) item.attributes.skill_level = parseInt(data.skillLevel);
            if(data.blurb) item.attributes.blurb = data.blurb;
            item.save().then(function(){
              console.log('update complete!');
              res.send(data);
            });
          }else{
            // create a new entry
            var entry = new TeachSkill({
              user_id: data.userId,
              skill_id: data.skillId,
              skill_level: data.skillLevel,
              blurb: data.blurb
            });
            entry.save().then(function(){
              res.send(entry);
            });
          }
        });
    }else if(data.type === "learn"){  // Learn skills
      new LearnSkill({skill_id: data.skillId, user_id: data.userId})
        .fetch()
        .then(function(item){ // check if already exists, update if exist
          if(item){
            if(data.skillLevel) item.attributes.skill_level = parseInt(data.skillLevel);
            if(data.blurb) item.attributes.blurb = data.blurb;
            item.save().then(function(){
              console.log('update complete!');
              res.send(data);
            });
          }else{
            // create a new entry
            var entry = new LearnSkill({
              user_id: data.userId,
              skill_id: data.skillId,
              skill_level: data.skillLevel,
              blurb: data.blurb
            });
            entry.save().then(function(){
              res.send(entry);
            });
          }
        });
    }else{
      res.send("Specify Learn/Teach Type!");
    }

  },

  deleteSkill: function(req,res){
    console.log("$$$$$$$$$$$ " + req.body.type);
    console.log("$$$$$$$$$$$ " + req.body.skillId);
    //req.body = { type: 'teach', skillId: 2, userId: 3 }
    // find the entry from teachskills or learnskills
    if(req.body.type === "teach"){
      new TeachSkill({skill_id: req.body.skillId, user_id: req.body.userId})
        .fetch()
        .then(function(item){
          if(item){
            item.destroy()
              .then(function(){
                res.send("Teach item successfully deleted.");
              });  
          }
        });
    }else if(req.body.type === "learn"){
      new LearnSkill({skill_id: req.body.skillId, user_id: req.body.userId})
        .fetch()
        .then(function(item){
          if(item){
            item.destroy()
              .then(function(){
                res.send("Learn item successfully deleted.");
              });  
          }
        });
    }else{
      res.send("Specify Learn/Teach Type!");
    }

  }

};
