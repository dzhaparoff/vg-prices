(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        '/assets/app',

    '@angular':                   '/node_modules/@angular',
    'angular2-in-memory-web-api': '/node_modules/angular2-in-memory-web-api',
    'rxjs':                       '/node_modules/rxjs',

    'ng2-file-upload':            '/node_modules/ng2-file-upload/ng2-file-upload.js',
    'moment':                     '/node_modules/moment/min/moment.min.js',
    'moment/locale/ru':           '/node_modules/moment/locale/ru.js',
    'lodash':                     '/node_modules/lodash/lodash.min.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'node_modules':               { defaultExtension: 'js' },
    'ng2-file-upload':            { defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);