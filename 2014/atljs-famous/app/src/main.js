/* globals define */
define(function(require, exports, module) {
  'use strict';

  // import dependencies
  var App = require('./app');
  
  var app = new App();

  app.start();

});