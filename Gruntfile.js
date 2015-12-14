module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            'df.shell': {
                src: 'src/**/*.html',
                dest: 'src/<%= pkg.name %>.templates.js'
            }
        },
        concat: {
            options: {

            },
            js: {
                src: ['src/<%= pkg.name %>.module.js', 'src/**/*.js'],
                dest: 'dist/df-shell.js'
            },
            css: {
                src: ['src/**/*.css'],
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/df-shell.min.css': 'dist/df-shell.css'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.html'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('prepare', ['ngtemplates', 'concat']);
    grunt.registerTask('build', ['ngtemplates', 'concat', 'uglify', 'cssmin']);
};
