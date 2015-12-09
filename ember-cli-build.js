/*jshint node:true*/
/* global require, module */
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var appDefaults = {
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Explorer 9', 'Opera 12.1', 'Android 2.2', 'BlackBerry 10'],
      cascade: false
    },

    fingerprint: {
      extensions: ['js', 'css'],
      generateRailsManifest: true,
      enabled: false
    },

    jscsOptions: {
      enabled: true,
      esnext: true,
      configPath: '.jscsrc',
      disableTestGenerator: false
    },

    vendorFiles: {
      'handlebars.js': null // Prevent handlebars from being loaded into vendor.js.
    }
  };

  // Enable sourcemaps in the final build directory
  // This will be enabled when deploying to all lower enviroments
  if (process.env.SOURCEMAPS) {
    appDefaults.sourcemaps = {
      enabled: true
    }
  }

  // If just developing styles, do not run es3Safe filter or
  // jshinting to speed up build time
  if (process.env.STYLE_BUILD) {
    appDefaults.es3Safe = false;
    appDefaults.hinting = false;
  }

  var appImports = function(app) {
    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.
    app.import('bower_components/normalize.css/normalize.css');
    app.import('bower_components/lodash/lodash.min.js');
  }

  // builds out ember-validator-example.js & ember-validator-example.css
  var desktopApp = require('./build/desktop')(defaults, appDefaults);
  // builds out ember-validator-example-mobile.js & ember-validator-example-mobile.css
  var mobileApp  = require('./build/mobile')(defaults, appDefaults);

  appImports(desktopApp);
  appImports(mobileApp);


  if (process.env.MOBILE) {
    return mobileApp.toTree();
  } else if (process.env.DESKTOP) {
    return desktopApp.toTree();
  } else {
    return mergeTrees([mobileApp.toTree(), desktopApp.toTree()], { overwrite: true });
  }
};
