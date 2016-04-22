'use strict';

import gulp       from 'gulp'
import plugins    from 'gulp-load-plugins'
import browser    from 'browser-sync'
import { config } from '../libs/config'

const $ = plugins();

export const stylesheets = function(){
  return gulp.src(config.stylesheets.src)
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sass({
            includePaths: config.stylesheets.include
          })
          .on('error', $.sass.logError))
      .pipe($.autoprefixer({
        browsers: config.compitability
      }))
      .pipe($.concat(config.stylesheets.file))
      .pipe($.if(config.is_production,  $.cssnano()))
      .pipe($.if(config.is_development, $.sourcemaps.write(".")))
      .pipe(gulp.dest(config.stylesheets.dest))
      .pipe(browser.reload({ stream: true }));
};

gulp.task('stylesheets', stylesheets);
