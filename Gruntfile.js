module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss', 'bower_components/bootstrap-sass/assets/stylesheets/bootstrap']
      },
      dist: {
        options: {
          outputStyle: 'uncompressed',
          sourceMap: true,
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['**/*.html'],
      },
      grunt: {
        options: {
          reload: true,
          livereload:true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: ['scss/**/**/*.scss','bower_components/bootstrap-sass/assets/stylesheets/bootstrap/**/*.scss'],
        tasks: ['sass'],
        
      },
      css: {
        files: 'css/*.css',
        options: {
          livereload:true,

        }
      }
      
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}
