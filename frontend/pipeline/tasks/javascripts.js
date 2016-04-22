'use strict';

import gulp           from 'gulp'
import plugins        from 'gulp-load-plugins'
import browser        from 'browser-sync'
import webpack_stream from 'webpack-stream'
import webpack        from 'webpack'
import { config }     from '../libs/config'

const $ = plugins();

export const javascripts = function(){

  const webpack_plugins = [];

  if(config.is_production)
    webpack_plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          mangle: false
        })
    );

  webpack_plugins.push(
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
      )
  );

  webpack_plugins.push(
      new webpack.ProvidePlugin(
          {'$': 'jquery', jQuery: 'jquery'}
      )
  );

  return gulp.src(config.javascripts.src)
      .pipe(webpack_stream(
          {
            output: {
              publicPath: config.javascripts.dest,
              filename: config.javascripts.file,
              libraryTarget: "umd"
            },
            node: {
              fs: 'empty'
            },
            cache: true,
            debug: true,
            devtool: 'source-map',
            resolve: {
              modulesDirectories: config.javascripts.modules
            },
            module: {
              loaders: [
                {
                  loader: "babel-loader",
                  exclude: /(node_modules|bower_components|vendor)/,
                  test: /\.jsx?$/,
                  query: {
                    presets: ['es2015']
                  }
                }
              ]
            },
            plugins: webpack_plugins
          }
      ))
      .pipe(gulp.dest(config.javascripts.dest))
      .pipe(browser.reload({ stream: true }));
};

gulp.task('javascripts', javascripts);