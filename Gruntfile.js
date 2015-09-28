'use strict';



module.exports = function(grunt) {



var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({


    config: config,


    pkg: grunt.file.readJSON('package.json'),

    

    sass: {
      options: {
        includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/bootstrap']
      },
      dist: {
        options: {
          outputStyle: 'uncompressed',
          sourceMap: true,
        },
        files: {
          'app/css/app.css': 'scss/app.scss'
          
        }
      }
    },
    
    watch: {
      livereload: {
        options: { livereload: true },
        files: ['<%= config.app %>/**/*.html'],
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
        files: '<%= config.app %>/css/*.css',
        options: {
          livereload:true,

        }
      }
    },
    serve: {
        options: {
            serve: {
                path: 'app/'
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'serve' , 'watch']);
}
