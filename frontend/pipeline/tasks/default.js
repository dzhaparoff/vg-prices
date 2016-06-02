'use strict';

import gulp           from 'gulp'
import gulpSequence   from 'gulp-sequence'
import fs             from 'fs'
import path           from 'path'
import { config }     from '../libs/config'

export const default_task = function(cb){
  gulpSequence('clean', ['typescripts', 'stylesheets', 'javascripts', 'vendor_javascripts', 'images', 'fonts'], 'watch')(
      () => {
        fs.readFile(
            path.resolve(config.src, "./systemjs.config.js"),
            (err, data) => {
              if (err)
                console.log(err);
              else
                fs.writeFileSync(path.resolve(config.dest, "./systemjs.config.js"), data);
            });
        cb();
      }
  )
};

gulp.task('default', default_task);
