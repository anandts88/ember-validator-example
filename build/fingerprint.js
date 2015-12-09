// After an `ember build --environment=production` is run
// fingerprint all the files, and update the references
// to those files in index.html

var broccoli = require('broccoli');
var assetRev = require('broccoli-asset-rev');
var RSVP     = require('rsvp');
var rimraf   = RSVP.denodeify(require('rimraf'));
var path     = require('path');
var EmberENV = require('../config/environment')(process.env.EMBER_ENV || 'production').EmberENV;
var copyDereferenceSync = require('copy-dereference').sync;

var mobileExclude  = Object.keys(EmberENV.mobile.extraJSFiles).map(function(path) { return EmberENV.mobile.extraJSFiles[path]; });
var desktopExclude = Object.keys(EmberENV.desktop.extraJSFiles).map(function(path) { return EmberENV.desktop.extraJSFiles[path]; });

var tree = assetRev('dist', {
  extensions: ['js', 'css', 'map'],
  replaceExtensions: ['html'],
  exclude: mobileExclude.concat(desktopExclude),
  generateRailsManifest: true
});

var builder = new broccoli.Builder(tree);
builder.build().then(function(hash) {
    var dir = hash.directory;
    var outputPath = path.join(process.cwd(), 'tmp_dist');
    // Delete tmp_dist/* contents
    return rimraf(outputPath).then(function() {
      // move fingerprinted dir into the tmp_dist/ dir location
      return copyDereferenceSync(dir, outputPath);
    });
  })
  .finally(function() {
    return builder.cleanup();
  })
  .then(function() {
    process.exit(0);
  })
  .catch(function(err) {
    // Should show file and line/col if present
    if (err.file) {
      console.error('File: ' + err.file);
    }
    console.error(err.stack);
    console.error('\nBuild failed');
    process.exit(1);
  });
