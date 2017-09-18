'use strict';

/**
 *  BROWSER-SYNC TASK
 */

import config from '../gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;

const gulp          = dependency.gulp;
const bsync         = dependency.browserSync;
const data          = configdata.browserSync;

gulp.task( 'browsersync', () => {
    bsync.init( data.options );
});

