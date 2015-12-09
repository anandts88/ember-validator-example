var EmberApp          = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees        = require('broccoli-merge-trees');
var unwatchedTree     = require('broccoli-unwatched-tree');
var merge             = require('lodash-node/modern/object/merge');
var pickFiles         = require('broccoli-static-compiler');
var concatFiles       = require('broccoli-concat');
var EOL               = require('os').EOL;
var walkSync          = require('walk-sync');
var fs                = require('fs');
var path              = require('path');
var removeFile        = require('broccoli-file-remover');
var esTranspiler      = require('broccoli-babel-transpiler');
var uglifyJavaScript  = require('broccoli-uglify-js');
var log               = require('broccoli-stew').log;
var debug             = require('broccoli-stew').debug;

var appConfig         = require('../config/environment')(process.env.EMBER_ENV);

// possible to determine the environment at this point?
var ENV               = require('../config/environment')(process.env.EMBER_ENV || 'development');

var desktopNamespace  = appConfig.APP.desktopAppNamespace;
var desktopOutFile    = 'ember-validator-example/' + desktopNamespace + '.js';

// Subclass EmberApp so hooks that are called
// on EmberApp during build process can be overriden
var MobileApp = function() {
  EmberApp.apply(this, arguments);
};
MobileApp.prototype = Object.create(EmberApp.prototype);
MobileApp.prototype.constructor = EmberApp;
// Hook invoked by ember-cli to perform
// compilation of all the relevant application javascript files.
// overriden to allow ember-validator-example-common files to be imported
// from the app/ directory so they can be extended by the mobile/ code
MobileApp.prototype.javascript = function() {
  // When the build is first invoked, looks through all the .js files
  // in mobile/ to see if any of the files import a file
  // from desktopNamespace (ember-validator-example-common)
  // Stores the file name for later use in importedDesktopFiles
  // so they can be included in es6 compilation
  // Since this is only run when the build is started, anytime a new file
  // is imported into mobile, the dev server will need to be restarted.
  var importedDesktopFiles = [];
  var importPattern = 'import\\s+(.+?)\\s+from\\s+[“‘"\']' + desktopNamespace + '\/(.+?)[”’"\']';
  var importRegex = new RegExp(importPattern);
  walkSync('mobile').forEach(function(fileName) {
    if (fileName.slice(-3) === '.js') {
      var relativeFileName = path.join('mobile', fileName);
      var fileContent = fs.readFileSync(relativeFileName, {encoding: 'utf8'});
      var fileMatch = fileContent.match(importRegex)
      if (fileMatch && fileMatch[2]) {
        importedDesktopFiles.push(fileMatch[2] + '.js');
      }
    }
  }.bind(this));

  if (importedDesktopFiles.length > 0) {
    // Only need to compile the files that were imported
    // pick them out of the app tree and resolve to the "ember-validator-example-common"
    // namespace.
    var desktopJS = pickFiles('app', {
      srcDir:  '/',
      files:   importedDesktopFiles,
      destDir: desktopNamespace
    });

    // es6 compile the imported files
    var desktopES6 = esTranspiler(desktopJS, {
      modules: 'amdStrict',
      moduleIds: true
    });

    // es6 transpile using Babel
    var transpiledTree = esTranspiler(desktopES6);

    var desktopOutFile = 'ember-validator-example/' + desktopNamespace + '.js';
    var onlyDesktop = concatFiles(transpiledTree, {
      inputFiles: [desktopNamespace + '/**/*.js'],
      outputFile: '/' + desktopOutFile,
      separator: EOL + ';'
    });

    var originalJavascript = EmberApp.prototype.javascript.apply(this, arguments);
    var appOutputPath = this.options.outputPaths.app.js;
    // Create appJs by combining "assets/ember-validator-example-mobile.js" and "ember-validator-example/ember-validator-example-common.js"
    var appJs = concatFiles(mergeTrees([onlyDesktop, originalJavascript]), {
      inputFiles: [appOutputPath.slice(1), desktopOutFile],
      outputFile: appOutputPath
    });
    // Make sure vendor-mobile is included in the tree.
    appJs = mergeTrees([originalJavascript, appJs], {overwrite: true});
    if (this.options.minifyJS.enabled === true) {
      var options = this.options.minifyJS.options || {};
      return uglifyJavaScript(appJs, options);
    } else {
      return appJs;
    }
  } else {
    return EmberApp.prototype.javascript.apply(this, arguments);
  }
};

// This is called first
// This function will create a new MobileApp() which will reference the ember-cli
// build process with our `ember-validator-example-common` updates
module.exports = function(defaults, appDefaults) {
  var mobileAppTree = 'app';

  var fileExclude = require('./mobile-file-exclude');

  // Drop files that are listed in mobile-file-exclude
  // to reduce the size of the final .js build
  mobileAppTree = removeFile(mobileAppTree, {
    files: fileExclude.app
  });

  // Watched by mobileAppTree, no need to watch twice, at least
  // according to comments in ember-cli
  // remove files that are listed in mobile-file-exclude
  // to reduce the size of the final .js (templates) and .css (styles) build.
  var mobileTemplatesTree = removeFile(unwatchedTree('app/templates'), { files: fileExclude.templates });
  var mobileStylesTree    = removeFile(unwatchedTree('app/styles'), { files: fileExclude.styles });

  var app = new MobileApp(merge({}, defaults, appDefaults, {
    // override the directories that are used by ember-cli
    // so that it looks for the file in mobile/ first and then
    // if the file is not found there, it checks app/
    trees: {
      app:       mergeTrees([mobileAppTree, 'mobile'], {overwrite: true}),
      templates: mergeTrees([mobileTemplatesTree, 'mobile/templates'], {overwrite: true}),
      styles:    mergeTrees([mobileStylesTree, 'mobile/styles'], {overwrite: true}),
      tests:     removeFile('tests', {
        path: 'desktop'
      })
    },
    outputPaths: {
      app: {
        css: {
          'app': '/assets/ember-validator-example-mobile.css'
        },
        js:  '/assets/ember-validator-example-mobile.js'
      },
      vendor: {
        css: '/assets/vendor-mobile.css',
        js:  '/assets/vendor-mobile.js'
      }
    }
  }));

  return app;
};
