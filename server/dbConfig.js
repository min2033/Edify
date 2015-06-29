// var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'edify',
    charset: 'utf8'
    // host: 'us-cdbr-iron-east-02.cleardb.net',
    // user: 'b7abb5a35e3177',
    // password: 'e23d2ee5',
    // database: 'heroku_b8b67000aedbc53',
    // charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);
db.plugin('registry');

///////////////////////
// clean
/////////////////////
// db.knex.schema.dropTable('users');
// db.knex.schema.dropTable('skills');
// db.knex.schema.dropTable('users_learn_skills');
// db.knex.schema.dropTable('users_teach_skills');


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255).unique();
      user.string('email', 255);
      user.string('github_id', 255);
      user.string('blurb', 255);
      user.string('avatar', 255);
      user.string('zip', 5);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('skills').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('skills', function (skill) {
      skill.increments('id').primary();
      skill.string('skill_name', 255).unique();
      skill.string('skill_description', 255);
      skill.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users_learn_skills').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users_learn_skills', function (entry) {
      entry.increments('id').primary();
      entry.integer('user_id', 255).references('users.id');
      entry.integer('skill_id', 255).references('skills.id');
      entry.string('blurb', 255);
      entry.integer('skill_level', 255);
      entry.integer('stars', 255);
      entry.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users_teach_skills').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users_teach_skills', function (entry) {
      entry.increments('id').primary();
      entry.integer('user_id', 255).references('users.id');
      entry.integer('skill_id', 255).references('skills.id');
      entry.string('blurb', 255);
      entry.integer('skill_level', 255);
      entry.integer('stars', 255);
      entry.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


/////////////////////////////////////////////////////////////////////////////////////
//  Database Schema for incomplete feature: UPVOTING OTHER USERS
//                   
db.knex.schema.hasTable('users_like_teachers').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users_like_teachers', function (entry) {
      entry.increments('id').primary();
      entry.integer('voter_id', 255).references('users.id');
      entry.integer('teach_skill_id', 255).references('users_teach_skills.skill_id');
      entry.integer('teacher_id', 255).references('users_teach_skills.user_id');
      entry.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
//  Database Schema for incomplete feature: UPVOTING OTHER USERS
//                  
db.knex.schema.hasTable('users_like_learners').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users_like_learners', function (entry) {
      entry.increments('id').primary();
      entry.integer('voter_id', 255).references('users.id');
      entry.integer('learn_skill_id', 255).references('users_learn_skills.skill_id');
      entry.integer('learner_id', 255).references('users_learn_skills.user_id');
      entry.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////

module.exports = db;
