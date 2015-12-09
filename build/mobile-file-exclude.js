
// Any file paths that are documented here will
// be excluded from the mobile build, reducing the
// mobile build file size. By default, all files under
// app/ will be included unless otherwise specified here.
// So, when adding new files to the desktop build, if they
// aren't intended to be used in mobile then they should be
// explicitly removed in this file.
//
// NOTE: There are separte sections for templates and styles
//       at the bottom of the file

// file paths relative to app/
module.exports.app = [
// All js files that needs to be excluded goes here.
  'router.js',
  'transitions.js'
];

// file paths relative to app/templates/
module.exports.templates = [
// All template files that needs to be excluded goes here.
  'templates/application.hbs',
  'templates/components/ev-menu.hbs'
];

// file paths relative to app/styles/
module.exports.styles = [
  // All scss files that needs to be excluded goes here.
  'styles/content.scss',
  'styles/common.scss'
];
