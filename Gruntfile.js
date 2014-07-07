'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          src: "**/*.jade",
          dest: "./result/",
          ext: ".html",
          cwd: "./pages/",
          expand: true
        }]
      }
    },

    less: {
      development: {
        options: {
          paths: ["./pages/stylesheets"]
        },
        files: {
          "./result/stylesheets/main.css": "./pages/stylesheets/main.less"
        }
      }
    },

    concat: {
      main: {
        files: {
          './result/javascripts/main.js': './pages/javascripts/**/*.js'
        }
      }
    },

    clean: ['./result/**/*.{html,css,js}'],

    express: {
        server: {
          options: {
            script: './server.js',
            port: 3080,
            spawn: true,
            livereload: true
          }
        }
    },

    watch: {
      scripts: {
        files: ['./pages/**/*'],
        tasks: ['build'],
      },
      options: {
        nospawn: false,
        atBegin: true,
        livereload: true
      }
    },
    parallel: {
      web: {
        options: {
        stream: true
      },
      tasks: [{
        grunt: true,
        args: ['watch']
      }, {
        grunt: true,
        args: ['express']
      }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-parallel');

  grunt.registerTask('build', ['clean', 'jade', 'less', 'concat:main']);
  grunt.registerTask('default', ['parallel:web']);
};

