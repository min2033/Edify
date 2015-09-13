module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    db_dump: {
      local: {
        options: {
          database: "edify",
          user: "root",
          pass: "",
          host: "localhost",
          backup_to: "db/backups/local.sql"
        }
      }
    },

    ngAnnotate: {
      app: {
          files: {
                  'client/dist/annotated.js': [
                    'client/app/controllers/allskills.js',
                    'client/app/controllers/allusers.js',
                    'client/app/controllers/user.js',
                    'client/app/controllers/main.js',
                    'client/app/controllers/skill.js',
                    'client/app/controllers/modal.js',
                    'client/app/services/services.js',
                    'client/app/services/location.js',
                    'client/app/app.js'
                    ]
                  },
          }
    },

    jshint: {
      files: [
        // Add filespec list here
        'client/app/controllers/allskills.js',
        'client/app/controllers/allusers.js',
        'client/app/controllers/user.js',
        'client/app/controllers/main.js',
        'client/app/controllers/skill.js',
        'client/app/controllers/modal.js',
        'client/app/services/services.js',
        'client/app/services/location.js',
        'client/app/app.js'
      ],
      options: {
        force: 'true',
        ignores: []
      }
    },

    shell: {
      multiple: {
        command: [
            'mysql.server start',
            'mysql -u root -e "DROP DATABASE IF EXISTS edify"',
            'mysql -u root -e "CREATE DATABASE edify"',
            'mysql -u root edify < db/backups/local.sql'
        ].join('&&')
      },
      dbSetup: {
        command: [
          'node db/dbSetup.js',
          '.exit'
        ].join('&&')
      }
    },

    clean: {
          js: ["client/dist/*.js","!client/dist/*.min.js"]
        },
    concat: {
      basic: {
        src: ['client/bower_components/angular/angular.js',
              'client/bower_components/angular-ui-router/release/angular-ui-router.js',
              'client/bower_components/angular-elastic/elastic.js',
              'client/bower_components/jquery/dist/jquery.js',
              'client/bower_components/bootstrap/dist/js/bootstrap.js',
              'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
              ],
        dest: 'client/dist/lib.js' 
      }
    },

    uglify: {
      my_target: {
        files: {
          'client/dist/main.min.js': ['client/dist/annotated.js'],
          'client/dist/lib.min.js': ['client/dist/lib.js']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'client/dist/style.min.css': ['client/bower_components/bootstrap/dist/css/bootstrap.css','client/styles/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['client/app/*.js','client/styles/*.css'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mysql-dump');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('backup', ['db_dump']);  // Save current MySQL data as pre-fill.
  grunt.registerTask('reset', ['shell:multiple']); // Reset DB with pre-fill data.
  grunt.registerTask('dbInit', ['shell:dbSetup']);
  grunt.registerTask('build', [
    'jshint',
    'ngAnnotate',
    'concat',
    'uglify',
    'cssmin',
    'clean'
  ]);

};