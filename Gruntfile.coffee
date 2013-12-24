module.exports = (grunt) ->
	pkg = grunt.file.readJSON('package.json')

	# Project configuration.
	grunt.initConfig

		# Tasks
		clean: 
			main: ['build']

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
					'build/styles/main.css': 'src/styles/main.less'

		useminPrepare:
			html: '/index.html'
			options:
        dest: 'build-raw/'

		usemin:
			html: 'build-raw/index.html'

		imagemin:
      dist:
        files: [
          expand: true,
          cwd: 'build-raw/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'build-raw/images'
        ]

    jekyll:
      options:
        serve: true
        src: "build/"

		watch:
			dev:
				options:
					livereload: true
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.less', '!src/libs/**/*.*']
				tasks: ['clean', 'concurrent:transform', 'copy:build']

		concurrent:
			transform: ['copy:main', 'less']

		
	grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

	grunt.registerTask 'default', ['clean', 'concurrent:transform', 'copy:build', 'watch']
	grunt.registerTask 'dist', ['clean', 'concurrent:transform', 'autoprefixer', 'min', 'compress', 'copy:build'] 