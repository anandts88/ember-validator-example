var EmberApp          = require('ember-cli/lib/broccoli/ember-app');
var merge             = require('lodash-node/modern/object/merge');
var removeFile        = require('broccoli-file-remover');

// possible to determine the environment at this point?
var ENV   = require('../config/environment')(process.env.EMBER_ENV || 'development');

module.exports = function(defaults, appDefaults) {
  var app = new EmberApp(merge({}, defaults, appDefaults, {
    trees: {
      tests: removeFile('tests', {
        path: 'mobile'
      })
    }
  }));

  return app;
};
