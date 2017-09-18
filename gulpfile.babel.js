'use strict';

/**
 * GULP TASK
 */

import config from './gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;

const gulp          = dependency.gulp;
const requireDir    = dependency.requireDir;
const data          = configdata.gulp;

requireDir( 'gulp', {recursive: true });

gulp.task( 'build:fulldev', data.fulldev, () => {
    gulp.watch( data.src, data.watch );
});

gulp.task( 'build:dev', data.dev, () => {
    gulp.watch( data.src, data.dev );
});

