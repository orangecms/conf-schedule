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
            'src': [
              'index.html',
              'app.js'
            ],
            'dest': 'release/'
          }
        ]
      }
    },

    useminPrepare: {
      html: 'index.html'
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
            'bower_components/x2js/xml2json.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-x2js/dist/x2js.min.js'
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
        files: {
          'release/style.css': [ 'style.css' ]
        }
      }
    },

    wget: {
      basic: {
        files: {
          'release/debconf15.xml': 'http://104.219.184.171/debconf15.xml'
        }
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
  grunt.loadNpmTasks('grunt-wget');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'cssmin',
    'usemin',
    'wget'
  ]);

};
