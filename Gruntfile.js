'use strict';

module.exports = function(grunt) {
  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  const testFiles = ['build/tests/*.js', 'jsTests/*.js'];

  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: testFiles
      }
    }
  });

  grunt.registerTask('default', 'mocha_istanbul');
};
