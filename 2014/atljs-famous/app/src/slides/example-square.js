/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/modifier');
  var View = require('famous/core/View');

  var centerModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  var square = new Surface({
    size: [200, 200],
    classes: ['blue-background']
  });

  var view = new View({
    origin: [0.5,0.5],
    align: [0.5, 0.5]
  });

  view.add( centerModifier ).add( square );

  module.exports = view;
});