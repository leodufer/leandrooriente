module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')

  # Project configuration.
  grunt.initConfig

    # Tasks
    clean: 
      main: ['build', 'dist']

    copy:
      main:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**', '!**/*.less']
          dest: 'build/'
        ]

    less:
      main:
        files:
          'build/static/styles/main.css': 'src/static/styles/main.less'

    imagemin:
      dist:
        files: [
          expand: true,
          cwd: 'build-raw/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'build-raw/images'
        ]

    jekyll:
      server:
        options:
          src: "build"
          dest: "dist"

    connect:
      main:
        options:
          port: 9001
          base: 'dist/'
          livereload: true

    watch:
      options:
        livereload: true
      dev:
        files: ['src/**/*.html', 'src/**/*.markdown', 'src/**/*.js', 'src/**/*.less', '!src/libs/**/*.*']
        tasks: ['clean', 'copy', 'less', 'jekyll']

    
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

  grunt.registerTask 'default', ['clean', 'copy', 'less', 'jekyll', 'connect', 'watch']