'use strict';

import gulp       from 'gulp'
import path       from 'path'
import browser    from 'browser-sync'
import { config } from '../libs/config'

export const watch = function() {
  const stylesheets_dir = path.dirname(config.stylesheets.src);
  gulp.watch(path.join(stylesheets_dir, "/**/*"), ['stylesheets', browser.reload]);

  const javascripts_dir = path.dirname(config.javascripts.src);
  gulp.watch(path.join(javascripts_dir, "/**/*"), ['javascripts', browser.reload]);

  const typescripts_dir = config.typescripts.src;
  gulp.watch(path.join(typescripts_dir, "/**/*"), ['typescripts', browser.reload]);
};

gulp.task('watch', watch);