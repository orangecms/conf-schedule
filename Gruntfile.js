module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    web_server: {
      options: {
        cors: true,
        port: 8000,
        nevercache: true,
        logRequests: true
      },
      foo: 'bar'
    },

    clean: [ 'release' ],

    copy: {
      main: {
        files: [
          {
            'expand': true,
            'flatten': true,
            'src': [
              'src/index.html',
              'src/app.js'
            ],
            'dest': 'release/'
          },
          {
            'expand': true,
            'flatten': true,
            'src': [
              'src/img/*'
            ],
            'dest': 'release/img/'
          }
        ]
      }
    },

    useminPrepare: {
      html: 'src/index.html'
    },

    usemin: {
      html: ['release/index.html']
    },

    uglify: {
      options: {
        report: 'min',
        mangle: false
      },
      dist: {
        files: {
          'release/lib.js': [
            'src/bower_components/x2js/xml2json.js',
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular-x2js/dist/x2js.min.js'
          ]
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: [ 'style.css' ],
          dest: 'release',
          ext: '.css',
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-web-server');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'cssmin',
    'usemin',
  ]);

};
