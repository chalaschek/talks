/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Surface = require('famous/core/Surface');
  var StateModifier = require('famous/modifiers/StateModifier');
  var View = require('famous/core/View');
  var Transform = require('famous/core/Transform');
  var Timer = require('famous/utilities/Timer');

  var initialTime = Date.now();

  var stateModifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
  });

  var square = new Surface({
    size: [200, 200],
    classes: ['double-sided', 'blue-background']
  });

  var view = new View({
    origin: [0.5,0.5],
    align: [0.5, 0.5]
  });

  view.add( stateModifier ).add( square );

  Timer.setInterval(function(){
    stateModifier.setTransform( Transform.rotateY(1000), { duration: 500, curve: 'easeOutBounce' });
    stateModifier.setTransform( Transform.rotateY(0), { duration: 3000, curve: 'easeOutBounce' });
  }, 2000);

  module.exports = view;
});