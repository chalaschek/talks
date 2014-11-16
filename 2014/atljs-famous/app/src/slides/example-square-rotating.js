/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/modifier');
  var View = require('famous/core/View');
  var Transform = require('famous/core/Transform');

  var initialTime = Date.now();

  var angle = 0;
  var centerModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: function(){
      angle += 0.03;
      return Transform.rotateY(angle);
    }
  });

  var square = new Surface({
    size: [200, 200],
    classes: ['double-sided', 'blue-background']
  });

  var view = new View({
    origin: [0.5,0.5],
    align: [0.5, 0.5]
  });

  view.add( centerModifier ).add( square );

  module.exports = view;
});