/* globals define */
define(function(require, exports, module) {
  'use strict';

  // import dependencies
  var Transform     = require("famous/core/Transform");
  var Modifier     = require("famous/core/Modifier");
  var Surface = require("famous/core/Surface");
  var View           = require('famous/core/View');
  var ImageSurface = require("famous/surfaces/ImageSurface");
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var FlexibleLayout = require('famous/views/FlexibleLayout');
  var Timer = require('famous/utilities/Timer');


  var container = new ContainerSurface({
    origin: [0.5,0.5],
    align: [0.5,0.5],
    // classes: ['famous', 'black-background'],
    classes: ['famous']
  });


  var ratios = [0.5, 0.5];
  var layout = new FlexibleLayout({
    direction: 1,
    ratios: ratios
  });


  // var depthTranform = Transform.translate(0, 0, 100);
  var depthTranform = Transform.translate(0, 0, 0);


  var logo = new ImageSurface({
      size: [200, 200],
      content: 'content/images/famous_logo_white.png',
      classes: ['double-sided']
  });

  var logoModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: depthTranform
  });

  var initialTime;
  function tranform() {
    return Transform.multiply( depthTranform, Transform.rotateY(.002 * (Date.now() - initialTime) ) );
  }

  Timer.setTimeout(function(){
    initialTime = Date.now();
    logoModifier.setTransform(tranform);
  }, 400)

  var logoView = new View({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  })

  logoView.add( logoModifier ).add(logo);

  var copyModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: depthTranform
  });

  var copy = new Surface({
    content: 'Famo.us',
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    classes: ['copy']
  });

  var copyView = new View({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  })

  copyView.add( copyModifier ).add(copy);

  layout.sequenceFrom([logoView, copyView]);

  container.add( layout );

  module.exports = container;

});