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

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);

})(this);