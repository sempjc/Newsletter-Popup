'use strict';

/**
 * GULP CONFIGURATION
 */

module.exports = {
    dependency:
    {
        gulp:            require( 'gulp'        ),
        requireDir:      require( 'require-dir' ),
        browserSync:     require( 'browser-sync'    ).create(),
        jshint:          require( 'gulp-jshint'     ),
        babelify:        require( 'babelify'        ),
        mocha:           require( 'gulp-mocha'      ),
        jsdocs:          require( 'gulp-jsdoc3'     ),
        browserify:      require( 'browserify'      ),
        source:          require( 'vinyl-source-stream'),
        buffer:          require( 'vinyl-buffer'    ),
        es6ify:          require( 'es6ify'          )
    },

    data:
    {
        gulp:
        {
            src:     [ 'src/*.js', 'test/*.js' ],
            fulldev: [ 'jshint', 'mocha', 'babelify', 'jsdocs','browsersync' ],
            dev:     [ 'jshint', 'mocha', 'babelify', 'jsdocs' ],
            watch:   [ 'jshint', 'mocha', 'babelify', 'jsdocs' ]
        },

        jsdocs:
        {
            configsrc: '',
            src:       ['src/*.js']
        },

        browserSync:
        {
            options:
            {
                server: {
                    baseDir: './'
                },
                files: [ './build/app.js' ]

            }
        },

        jshint:
        {
            src:      'src/*.js',
            reporter: 'default',
            options:
            {
                esversion: 6
            }
        },

        babelify:
        {
            src:     './src/app.js',
            dest:    './build/',
            sourcemap: 'app.js',
            options:
            {
                presets: [ 'es2015' ]
            },
        },


        babelifyTest:
        {
            src:     './test/popup_spec.js',
            dest:    './build/test',
            sourcemap: 'popup_spec.js',
            options:
            {
                presets: [ 'es2015' ]
            },
        },

        mocha:
        {
            src: 'test/*.js',
            options:
            {
                reporter: 'spec',
                compilers: 'js:babel-core/register'
            }
        }
     }
};
