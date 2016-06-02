'use strict';

import gulp           from 'gulp'
import plugins        from 'gulp-load-plugins'
import browser        from 'browser-sync'
import webpack_stream from 'webpack-stream'
import webpack        from 'webpack'
import { config }     from '../libs/config'

const $ = plugins();

export const typescripts = function(){
  const tscConfig = require(config.typescripts.config);
  let tsProject = $.typescript.createProject(tscConfig.compilerOptions);

  let sources = [];

  sources.push(config.typescripts.src + "/**/*");
  for(let i in config.typescripts.definitions) {
    sources.push(config.typescripts.definitions[i]);
  }

  return gulp
      .src(sources)
      .pipe($.sourcemaps.init())
      .pipe($.typescript(tsProject))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(config.typescripts.dest))
      .pipe(browser.reload({ stream: true }));
};

gulp.task('typescripts', typescripts);