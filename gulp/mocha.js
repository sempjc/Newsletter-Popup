'use strict';

/**
 * MOCHA TASK
 */

import config from '../gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;

const gulp          = dependency.gulp;
const mocha         = dependency.mocha;
const data          = configdata.mocha;

gulp.task( 'mocha', () => {
    gulp.src( data.src, {read: false})
        .pipe( mocha( data.options ))
});

