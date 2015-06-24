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
  github_id: 'ultralame',
  avatar: 'https://avatars.githubusercontent.com/u/690729?v=3',
  blurb: 'I like to do stuff'
});

var user2 = new User({
  username: 'jp',
  email: 'theboss@canadatopcondoms.com',
  github_id: 'baka101',
  avatar: 'https://avatars.githubusercontent.com/u/7163397?v=3',
  blurb: 'I also like to do stuff'
});

var user3 = new User({
  username: 'sally',
  email: 'asdf@aol.com',
  github_id: 'sol33t',
  avatar: 'https://avatars.githubusercontent.com/u/10736577?v=3',
  blurb: 'wait a minute...'
});

//SAVE SKILLS

var skills = ['html',
'css',
'javascript',
'python',
'ruby',
'databases',
'algorithms',
'electronics',
'microcontrollers',
'fabrication'];

skills.forEach(function(skillName) {
  var skill = new Skill({
    skill_name: skillName
  });
  skill.save();
});


//SAVE LEARN SKILLS
var learnSkill1 = new LearnSkill({
  skill_id: 1,
  user_id: 1,
  skill_level: 1,
  blurb: 'im good'
});

var learnSkill2 = new LearnSkill({
  skill_id: 3,
  user_id: 1,
  skill_level: 5,
  blurb: 'im ok'
});

var teachSkill1 = new TeachSkill({
  skill_id: 1,
  user_id: 2,
  skill_level: 7,
  blurb: 'im very good'
});

var teachSkill2 = new TeachSkill({
  skill_id: 3,
  user_id: 2,
  skill_level: 3,
  blurb: 'wat'
});


// SAVE SAMPLE DATA
user1.save();
user2.save();
user3.save();

learnSkill1.save();
learnSkill2.save();
teachSkill1.save();
teachSkill2.save();

// TEST FETCHING
// new User({username: 'colin'})
//   .fetch({
//     withRelated: ['learnSkills']
//   })
//   .then(function (user) {
//     console.log('==========> fetched user who wants to learn:', user);
//   });

// new User({ username: 'jp' })
//   .fetch({
//     withRelated: 'teachSkills'
//   })
//   .then(function (user) {
//     console.log('==========> fetched user who wants to teach:', user);
//     console.log('==========> teachSkills:', user.relations.teachSkills.models);
//   });