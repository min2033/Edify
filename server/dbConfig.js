// var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'spork',
    password: '',
    database: 'spork',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

///////////////////////
// clean
///////////////////////
// db.knex.schema.dropTable('users');
// db.knex.schema.dropTable('skills');
// db.knex.schema.dropTable('users_learn_skills');
// db.knex.schema.dropTable('users_teach_skills');


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('email', 255);
      user.string('github_id', 255);
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
      skill.string('skill_name', 255);
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
      entry.integer('user_id', 255);
      entry.integer('skill_id', 255);
      entry.integer('skill_level', 255);
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
      entry.integer('user_id', 255);
      entry.integer('skill_id', 255);
      entry.integer('skill_level', 255);
      entry.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
