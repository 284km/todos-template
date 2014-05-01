module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      assets:
        expand: true
        flatten: true
        src: ['assets/*.coffee']
        dest: 'public/js/'
        ext: '.js'
      tests:
        expand: true
        flatten: true
        src: ['test/*.coffee']
        dest: 'test/js/'
        ext: '.js'

    haml:
      one:
        files:
          'views/index.html': 'views/index.haml'
      two:
        files:
          grunt.file.expandMapping(['views/*.haml'], '', {
            rename: (base, path) ->
              return base + path.replace(/\.haml$/, '.html');
          })

    slim:
      dist:
        files:
          'views/index.html': 'views/index.slim',
          'views/test.html': 'views/test.slim',

    watch:
      options:
        livereload: true
    livereload:
      port: 35729

    regarde:
      coffee:
        files: 'assets/*.coffee'
        tasks: ['coffee', 'livereload' ]

      views:
        files: 'views/*.*'
        tasks: [ 'livereload' ]

      tests:
        files: 'test/*.coffee'
        tasks: ['coffee']

      runner:
        files: [ 'test/*.slim' ]
        tasks: ['slim']

  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-contrib-coffee'

  grunt.registerTask 'default', [
    'slim',
    'coffee'
  ]
