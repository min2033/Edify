var db = require('../server/dbConfig.js');
var User = require('../server/models/user');
var Skill = require('../server/models/skill');
var Users = require('../server/collections/users');
var Skills = require('../server/collections/skills');
var LearnSkill = require('../server/models/learnSkill');
var TeachSkill = require('../server/models/teachSkill');


//SAVE USERS
var user1 = new User({
  username: 'colin',
  email: 'casparsons@gmail.com',
  github_id: 'ultralame'
});

var user2 = new User({
  username: 'jp',
  email: 'theboss@canadatopcondoms.com',
  github_id: 'baka101'
});

var user3 = new User({
  username: 'sally',
  email: 'asdf@aol.com',
  github_id: 'sol33t'
});

// user1.save();
// user2.save();
// user3.save();

//SAVE SKILLS
var skill1 = new Skill({
  skill_name: 'javascript'
});

var skill2 = new Skill({
  skill_name: 'ruby'
});

var skill3 = new Skill({
  skill_name: 'python'
});

// skill1.save();
// skill2.save();
// skill3.save();

//SAVE LEARN SKILLS
var learnSkill1 = new LearnSkill({
  skill_id: 1,
  user_id: 1,
  skill_level: 1
});

var learnSkill2 = new LearnSkill({
  skill_id: 3,
  user_id: 1,
  skill_level: 5
});

// learnSkill1.save();
// learnSkill2.save();

new User({username: 'colin'})
  .fetch({
    withRelated: ['learnSkills']
  })
  .then(function (data) {
    console.log('==========> fetched data:', data);
  });

