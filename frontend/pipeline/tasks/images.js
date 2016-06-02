'use strict';

import gulp           from 'gulp'
import plugins        from 'gulp-load-plugins'
import browser        from 'browser-sync'
import { config }     from '../libs/config'

const $ = plugins();

export const images = function(){

  return gulp
      .src([
        config.images.src
      ])
      .pipe($.imagemin())
      .pipe(gulp.dest(config.images.dest))
      .pipe(browser.reload({ stream: true }));
};

gulp.task('images', images);