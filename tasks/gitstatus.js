module.exports = function (grunt) {
  'use strict';
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('gitstatus', 'Runs git status', function () {

    var done = this.async();
    var exec = require('child_process').exec,
      ls = exec('git status', function (error, stdout, stderr) {
        if (error == null) {
          var x = stdout.indexOf('nothing to commit (working directory clean)');
          if (x !== -1) {
            var y = stdout.indexOf('Your branch is ahead of');
            if (y !== -1) {
              exec('git push', {env: process.env}, function (error, stdout, stderr) {
                grunt.log.writeln('pushed changes');
                done();
              });
            } else {
              grunt.log.writeln(stdout)
            }
          } else {
            grunt.warn(stdout)
          }
        }
      });
  });
};