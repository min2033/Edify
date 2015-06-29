var db = require('../server/dbConfig.js');
var Skill = require('../server/models/skill');
var Skills = require('../server/collections/skills');

//SAVE SKILLS

var topics = {
  html: "the hypertext markup language has come a long way since it was created in the early 90s. learn to use some of the powerful new elements like audio, video, and canvas.",
  css: "cascading style sheets make the modern web pretty. from layout to typography, transitions & animations to mobile responsive design, knowing this famously arcane web standard will keep your projects looking sharp.",
  javascript: "created in 10 days in may 1995, javascript is the only language that runs in web browsers. these days it also runs on servers and robots with node. fun fact: this website is written entirely in javascript!",
  python: "named after the british comedy group, python is loved for its readability, simplicity, and decent performance for a high level language.",
  ruby: "designed for the happiness of programmers who use it, ruby gained popularity along with the rails web framwork.",
  algorithms: "improve your coding and thinking skills by solving problems and iterating solutions for efficiency and elegance.",
  databases: "need to store information? you'll need a database. knowing how and when to use different kinds of databases will set you apart from the masses.",
  electronics: "bend one of the fundamental forces of nature to your will using conductive circuitry. heat up the iron and crank that solder-boy.",
  microcontrollers: "connect inputs like buttons and sensors to outputs like lights and motors. upload some code and now you have a robot!",
  fabrication: "making physical things is fun! you'll find a bunch of useful tools at your nearest hackerspace, fablab, or techshop."
}

var each = function(object, callback) {
  for (var key in object) {
    callback(object[key], key);
  }
};


//give it a sec create the tables first;
setTimeout(function () {
  each(topics, function(description, name) {
    var skill = new Skill({
      skill_name: name,
      skill_description: description
    });
    skill.save();
  });
}, 2000);

setTimeout(function () {
  process.exit();
}, 4000);
