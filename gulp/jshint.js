'use strict';

/**
 * JSHINT TASK
 */

import config from '../gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;

const gulp          = dependency.gulp;
const jshint        = dependency.jshint;
const data          = configdata.jshint;

gulp.task( 'jshint', () => {
    gulp.src( data.src )
        .pipe( jshint( data.options ) )
        .pipe( jshint.reporter( data.reporter ));
});
