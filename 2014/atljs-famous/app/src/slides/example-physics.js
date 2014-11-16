/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Surface = require('famous/core/Surface');
  var StateModifier = require('famous/modifiers/StateModifier');
  var View = require('famous/core/View');
  var Transform = require('famous/core/Transform');
  var Timer = require('famous/utilities/Timer');
  var SpringTransition = require('famous/transitions/SpringTransition');

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

  var _spring = {
    method: SpringTransition,
    period: 500,
    dampingRatio: 0.2
  }

  function spring(){
    stateModifier.setTransform( Transform.rotateY(1000), _spring);
    stateModifier.setTransform( Transform.rotateY(0), _spring );
  }

  Timer.setTimeout(function(){
    spring();
  }, 1500);

  Timer.setInterval(function(){
    spring();
  }, 8000);

  module.exports = view;
});