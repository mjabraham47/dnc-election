// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
// ===========================================================================
// CONFIGURE GRUNT ===========================================================
// ===========================================================================
grunt.initConfig({
    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    jshint: {
        all: ['client/*.js', ]
    },
    // take all the js files and minify them into app.min.js
    uglify: {
        my_target: {
            files: {
                'client/dist/js/app.min.js': ['client/*.js']
            }
        }
    },
    // CSS TASKS ===============================================================
    // process the less file to style.css
    // take the processed style.css file and minify
    cssmin: {
        target: {
            files: {
                'client/dist/css/style.min.css': ['client/**/*.css']
            }
        }
    },
    // COOL TASKS ==============================================================
    watch: {
        options: {
            livereload: 1337,
        },
        src: {
            files: ['client/**/*.js', 'client/css/*.css', 'client/index.html', 'client/templates/*.html'],
            tasks: []
        }
    },
    nodemon: {
        dev: {
            script: 'app.js'
        }
    },
    // run watch and nodemon at the same time
    concurrent: {
        options: {
            logConcurrentOutput: true
        },
        tasks: ['nodemon', 'watch']
    },
    //inject js and css files into index.html
    injector: {
        options: {
            starttag: '<!-- injector:js -->',
            endtag: '<!-- endinjector -->',
            transform: function(filePath) {
                filePath = filePath.replace('client/', '');
                return '<script src="' + filePath + '"></script>';
            },
            destFile: 'client/index.html',
            template: 'client/index.html',
            // Task-specific options go here.
        },
        local_dependencies: {
            'client/index.html': ['client/**/*.js', 'client/**/*.css']
        },
    },
    ngconstant: {
        options: {
            name: 'config'
        },
        development: {
            options: {
              dest: 'client/js/environment_script.js'
            },
            constants: {
                ENV: 'development'
            }
        },
        production: {
            constants: {
                ENV: 'production'
            }
        }
    }

});
// ===========================================================================
// LOAD GRUNT PLUGINS ========================================================
// ===========================================================================
// we can only load these if they are in our package.json
// make sure you have run npm install so our app can find these
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-injector');
grunt.loadNpmTasks('grunt-ng-constant');

grunt.registerTask('serve', ['concurrent', 'ngconstant:development']);
grunt.registerTask('inject', ['injector']);
};
