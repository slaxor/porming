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
          src: "./**/*.jade",
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
          './result/javascripts/main.js': ['./pages/javascripts/jquery-2.1.1.js', './pages/javascripts/**/*.js', './pages/javascripts/main.js']
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
    },

    sshconfig: {
      host: '127.0.0.1',
      username: 'slash',
      agent: process.env.SSH_AUTH_SOCK,
      privateKey: grunt.file.read(process.env.HOME + "/.ssh/id_dsa"),
      srcPath: './result',
      path: '/tmp/foobar',
      showProgress: true
    },
    //sshconfig: grunt.file.readJSON('secret.json'),

    sftp: {
      copyfiles: {
        files: [{
          src: "**/*",
          path: "/tmp/foobarbaz/",
          cwd: "./result/",
          expand: true
        }],
        //files: {
          //"foobarbaz": "result/index.html"
        //},
        options: {
          srcPath: '<%= sshconfig.srcPath %>',
          path: '<%= sshconfig.path %>',
          host: '<%= sshconfig.host %>',
          username: '<%= sshconfig.username %>',
          agent: '<%= sshconfig.agent %>',
          privateKey: '<%= sshconfig.privateKey %>',
          showProgress: true,
          createDirectories: true
        }
      }
    },
    sshexec: {
      prepare: {
        command: 'mkdir -pv /tmp/foobarbaz',
        options: {
          path: '<%= sshconfig.path %>',
          host: '<%= sshconfig.host %>',
          username: '<%= sshconfig.username %>',
          agent: '<%= sshconfig.agent %>',
          privateKey: '<%= sshconfig.privateKey %>',
          showProgress: true
        }
      },
      postpare: {
        command: 'ls -lAh /tmp/foobarbaz',
        options: {
          path: '<%= sshconfig.path %>',
          host: '<%= sshconfig.host %>',
          username: '<%= sshconfig.username %>',
          agent: '<%= sshconfig.agent %>',
          privateKey: '<%= sshconfig.privateKey %>',
          showProgress: true
        }
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
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('build', ['clean', 'jade', 'less', 'concat:main']);
  grunt.registerTask('deploy', ['sshexec:prepare', 'sftp:copyfiles', 'sshexec:postpare']);
  grunt.registerTask('default', ['parallel:web']);
};

