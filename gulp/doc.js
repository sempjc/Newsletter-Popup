'use strict';

/**
 *  JSDOC3 TASK
 */

import config from '../gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;

const gulp          = dependency.gulp;
const jsdocs        = dependency.jsdocs;
const data          = configdata.jsdocs;

gulp.task( 'jsdocs', (cb) => {
    gulp.src( data.src, { read: false })
        .pipe( jsdocs(cb) )
});
