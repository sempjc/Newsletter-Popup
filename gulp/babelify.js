'use strict';

/**
 * BABELIFY TASK
 */

import config from  '../gulpconfig';

const dependency    = config.dependency;
const configdata    = config.data;


const gulp          = dependency.gulp;
const browserify    = dependency.browserify;
const es6ify        = dependency.es6ify;
const source        = dependency.source;
const buffer        = dependency.buffer;
const data          = configdata.babelify;
const dataTest      = configdata.babelifyTest;

gulp.task( 'babelify', () => {
     browserify( data.src )
      .transform( 'babelify', data.options )
      .bundle()
      .pipe( source( data.sourcemap ) )
      .pipe( buffer() )
      .pipe( gulp.dest( data.dest ) );
});

// Babelify the Test so we can test on browser
gulp.task( 'babelify:test', () => {
     browserify( dataTest.src )
      .transform( 'babelify', dataTest.options )
      .bundle()
      .pipe( source( dataTest.sourcemap ) )
      .pipe( buffer() )
      .pipe( gulp.dest( dataTest.dest ) );
});
