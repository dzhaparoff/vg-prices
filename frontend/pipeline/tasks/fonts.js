'use strict';

import gulp           from 'gulp'
import plugins        from 'gulp-load-plugins'
import browser        from 'browser-sync'
import { config }     from '../libs/config'

const $ = plugins();

var fonts = function() {
  return gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.dest))
      .pipe(browser.reload({ stream: true }));
};

gulp.task('fonts', fonts);