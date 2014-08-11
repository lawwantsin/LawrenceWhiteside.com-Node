'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    },
    jasmine : {
      clientSpecs: {
        options: {
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: ['js/main.js', 'spec/client/main.js'],
            requireConfig: {
              baseUrl: ''
            }
          }
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        // 'src/*/*/*.js',
        // 'spec/*/*/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
     bower: {
      target: {
        rjsConfig: 'public/js/main.js'
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) grunt.log.ok('Delayed live reload successful.');
          else grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-template-jasmine-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['develop', 'watch']);
};
