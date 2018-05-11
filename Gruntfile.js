module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'http-server': {
      'dev': {
        port: 8000,
      },
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
              'src/app.js',
              'src/schedule.xml'
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
            'src/bower_components/angular-x2js/dist/x2js.min.js',
            'src/bower_components/moment/min/moment.min.js'
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

  grunt.loadNpmTasks('grunt-http-server');

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
