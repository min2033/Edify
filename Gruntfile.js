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

    shell: {
      multiple: {
        command: [
            'mysql.server start',
            'mysql -u root -e "DROP DATABASE IF EXISTS edify"',
            'mysql -u root -e "CREATE DATABASE edify"',
            'mysql -u root edify < db/backups/local.sql'
        ].join('&&')
      }
    },

    uglify: {
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mysql-dump');
  grunt.loadNpmTasks('grunt-shell');



  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('backup', ['db_dump']);
  grunt.registerTask('reset', ['shell']);

};