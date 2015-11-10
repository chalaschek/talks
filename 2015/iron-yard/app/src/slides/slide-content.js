/* globals define */
define(function(require, exports, module) {
  'use strict';


  var Surface = require('famous/core/Surface');

  function SlideContent(options) {
      Surface.apply(this, arguments);
      this._superDeploy = Surface.prototype.deploy
  }

  SlideContent.prototype = Object.create(Surface.prototype);
  SlideContent.prototype.constructor = SlideContent;

  SlideContent.prototype.deploy = function deploy(target) {
    this._superDeploy(target);
    this.emit('target.size', { height: target.offsetHeight, width: target.offsetWidth});
  };

  module.exports = SlideContent;

});