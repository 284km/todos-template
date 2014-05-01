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

    handlebars:
      build:
        options:
          namespace: "JST"
          processName: (filename) ->
            (/\/([a-zA-Z1-9-]+)\.html$/.exec(filename))[1]
        files:
          "public/js/templates/item.js": ["views/templates/item.html"]

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
  grunt.loadNpmTasks 'grunt-contrib-handlebars'

  grunt.registerTask 'default', [
    'slim',
    'coffee',
    'handlebars',
  ]
