module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concurrent: {
			tasks: ['nodemon','watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		clean: {
			js: {
				src: ['public/js/simple.js']
			},
			css: {
				src: ['public/css/simple.css']
			}
		},
		concat: {
			js: {
				src: [
					'public/vendor/jquery/*.js',
					'public/vendor/jquery-ui/*.js',
					'public/vendor/underscore/*.js',
					'public/vendor/backbone/*.js',
					'public/vendor/frame/*.js',
					'public/js/model/*.js',
					'public/js/view/*.js',
					'public/js/page/*.js'
				],
				dest: 'public/js/simple.js'
			},
			css: {
				src: [
					'public/css/*.css'
				],
				dest: 'public/css/simple.css'
			}
		},
		uglify: {
			js: {
				files: {
					'public/js/simple.js': ['public/js/simple.js']
				}
			}
		},
		cssmin: {
			css: {
				files: {
					'public/css/simple.css': ['public/css/simple.css']
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'public/vendor/frame/*.js',
					'public/js/model/*.js',
					'public/js/view/*.js',
					'public/js/page/*.js'
				],
				tasks: ['clean:js', 'concat:js', 'uglify']
			},
			css: {
				files: [
					'public/css/*.css'
				],
				tasks: ['clean:css', 'concat:css', 'cssmin']
			}
		},
		nodemon: {
			dev: {
				script: 'app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['clean','concat','uglify', 'cssmin', 'concurrent'])};
