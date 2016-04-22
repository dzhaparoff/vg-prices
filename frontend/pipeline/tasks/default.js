'use strict';

import gulp         from 'gulp'
import gulpSequence from 'gulp-sequence'

export const default_task = function(cb){
  gulpSequence('clean', ['typescripts', 'stylesheets', 'javascripts'], 'watch')(cb)
};

gulp.task('default', default_task);
