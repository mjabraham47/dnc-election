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
                    'client/dist/js/app.min.js': ['client/js/**/*.js']
                }
            }
        },
        //take all the html and minify them
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'client/dist/index.html': 'client/index.html', 'client/dist/templates.html': 'client/templates/*.html' // 'destination': 'source'
                }
            }
        },
        // CSS TASKS ===============================================================
        // process the less file to style.css
        // take the processed style.css file and minify
        cssmin: {
            target: {
                files: {
                    'client/dist/css/style.min.css': ['client/css/compiled_sass/*.css']
                }
            }
        },
        sass: {
            options: {
                sourceMap: false,
                style: 'expanded'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'client/sass',
                    src: ['**/*.scss'],
                    dest: 'client/css/compiled_sass',
                    ext: '.css'
                }]
            }
        },
        // COOL TASKS ==============================================================
        watch: {
            options: {
                livereload: 1337,
            },
            src: {
                files: ['client/**/*.js', 'client/sass/*.scss', 'client/css/*.css', 'client/index.html', 'client/templates/*.html'],
                tasks: ['sass', 'uglify', 'htmlmin', 'cssmin']
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('build-control');

    grunt.registerTask('serve', ['concurrent']);
    grunt.registerTask('inject', ['injector']);
    grunt.registerTask('build',['sass', 'uglify', 'htmlmin', 'cssmin'])

};
