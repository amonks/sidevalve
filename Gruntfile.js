module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'clean': {
      build: {
        src: ["demo"]
      }
    },

    'copy': {
      js: {
        files: [
          {
            cwd: 'dist',
            src: '**/*',
            dest: 'demo',
            expand: true
          },
        ]
      },
      pub: {
        files: [
          {
            cwd: 'pub',
            src: '**/*',
            dest: 'demo',
            expand: true
          },
        ]
      },
    },

    'concat': {
      js: {
        src: ['src/js/license.js', 'src/js/templates.js', 'src/js/sidevalve.js'],
        dest: 'dist/sidevalve.js',
      },
    },

    'handlebars': {
      compile: {
        options: {
          namespace: "Handlebars.templates"
        },
        files: {
          "src/js/templates.js": ["src/handlebars/*.hbs"]
        }
      }
    },

    'uglify': {
      js: {
        options: {
          banner: grunt.file.read('src/js/license.js')
        },
        files: {
          'dist/sidevalve.min.js': 'dist/sidevalve.js'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'demo'
      },
      src: ['**']
    }

  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gh-pages');


  grunt.registerTask('cleanup', [
    'clean:build',
  ]);

  grunt.registerTask('build', [
    'cleanup',
    'copy:pub',
    'handlebars:compile',
    'concat:js',
    'uglify:js',
    'copy:js'
  ]);

  grunt.registerTask('push', [
    'build',
    'gh-pages'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};