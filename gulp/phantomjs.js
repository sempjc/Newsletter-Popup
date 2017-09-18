'use strict';

/**
 *  Mocha - PhantomJS
 */

import config from '../gulpconfig';

const dependency     = config.dependency;
const configdata     = config.data;

const gulp           = dependency.gulp;
const mochaPhantomJS = dependency.mochaPhantomJS;
const data           = configdata.mochaPhantomJS;

gulp.task('mochaphantom', () => {
    return gulp.src( data.src )
    .pipe(mochaPhantomJS( data.options ));
});
