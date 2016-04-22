'use strict';

import gulp   from 'gulp'
import rimraf from 'rimraf'
import fs     from 'fs'
import path   from 'path'
import { config } from '../libs/config'

export const clean = function(cb){

  var src_path  = path.resolve(config.src, "../node_modules");
  var dest_path = path.resolve(config.dest, "../node_modules");

  rimraf(dest_path, () => {
    fs.symlinkSync(src_path, dest_path);
  });

  rimraf(config.dest, cb);
};

gulp.task('clean', clean);
