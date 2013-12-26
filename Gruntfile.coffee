module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')

  # Project configuration.
  grunt.initConfig

    # Tasks
    clean: 
      main: ['build', '.tmp', 'dist']

    copy:
      main:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**', '!**/*.less', '!media/*.*']
          dest: 'build/'
        ]
      media:
        files: [
          expand: true
          cwd: 'src/'
          src: ['media/*.*']
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
          cwd: 'src/media',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'build/media'
        ]

    useminPrepare:
      html: 'build/_includes/head.html'
      options:
        root: 'build/'
        dest: 'build/'

    usemin:
      html: 'build/_includes/head.html'

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

  grunt.registerTask 'default', ['clean', 'copy:main', 'copy:media', 'less', 'jekyll', 'connect', 'watch']
  grunt.registerTask 'dist', ['clean', 'copy:main', 'imagemin', 'less', 'min', 'jekyll']
  grunt.registerTask 'min', ['useminPrepare', 'concat', 'cssmin', 'usemin']