/* Grunt tasks */
'use strict';

var folderMount, lrSnippet, path;

path = require('path');

lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

folderMount = function(connect, point) {
	return connect["static"](path.resolve(point));
};

module.exports = function(grunt) {
	grunt.initConfig({
		/* clean all the build files */
		clean : {
			all : ['build/']
		},
		/* Install bower components */
		bower: {
			install: {
			   options: {
					 targetDir: 'build/lib'
			  }
			}
		},
		/* Start a server */
		connect: {
	    server: {
	      options: {
	        port: 8060,
					base: 'build'
	      }
	    }
  	},
		/* Copy all the required source files to build directory */
		copy: {
	    main: {
	    files: [
		    {
					cwd: 'src/views/',
			    src: '**/*',
			    dest: 'build/views/',
			    expand: true
				},
				{
					cwd: 'src/',
			    src: 'index.html',
			    dest: 'build/',
			    expand: true
				},
				{
					cwd: 'src/assets',
			    src: '**/*',
			    dest: 'build/assets',
			    expand: true
				}
	    ]
	  },
	},
	/* Watch for the current changes - TODO */
	watch: {
  html: {
    files: ['views/*.html', 'scripts/*.js', 'scripts/**/*.js'],
    tasks: ['default']
  }
 },
 /* JShint */
		jshint : {
			all : ['Gruntfile.js'],
			options : {
				jshintrc : '.jshintrc'
			}
		},
		/* concat all the JS and CSS files and move to build directory */
		concat : {
			scripts : {
				src : ["src/scripts/*.js", "src/scripts/services/*.js", "src/scripts/controller/*.js"],
				dest : 'build/contact-manager.js'
			},
			styles : {
				src: ['src/styles/*.css'],
        dest: 'build/styles/main.css'
			}
		},
		/* Add Karma config - launch only in chrome browser */
		karma: {
		  unit: {
		    configFile: 'karma.conf.js',
		    port: 8050,
		    singleRun: false,
		    browsers: ['Chrome'],
		    logLevel: 'ERROR'
		  }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['clean:all', 'bower:install', 'copy', 'concat:scripts', 'concat:styles', 'karma']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('serve', [
	'connect:server',
	'default',
	'watch'
	]);
};
/* End Grunt config */
