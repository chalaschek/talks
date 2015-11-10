/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Engine = require('famous/core/Engine');
  var Backbone = require('backbone');
  var _ = require('underscore');
  var Slide = require('./slides/slide');
  var slides = require('./slides/config');


  function App(){
    Backbone.Router.apply(this, arguments);
    this.mainContext = Engine.createContext();
    this.mainContext.setPerspective(10000);
    this.initEvents();
  }


  App.prototype = Object.create(Backbone.Router.prototype);
  App.prototype.constructor = App;


  App.prototype.routes = {
    '*path' : 'slide'
  };

  App.prototype.initEvents = function(){

    Engine.on('keydown', function(e) {
      if(!this._visibileSlide) return;
      if (e.which === 39) this._visibileSlide.forward();
      else if (e.which === 37) this._visibileSlide.backward();
    }.bind(this));

    Engine.on('mouseup', function(e) {
      if(e && e.target.localName == 'a') return;
      if(!this._visibileSlide) return;
      this._visibileSlide.forward();
    }.bind(this));


    this.touch = {
      startX: 0,
      startY: 0,
      startSpan: 0,
      startCount: 0,
      captured: false,
      threshold: 40
    };

    window.addEventListener( 'touchstart', function(){
      this.onTouchStart.apply(this, arguments);
    }.bind(this), false );
    window.addEventListener( 'touchmove', function(){
      this.onTouchMove.apply(this, arguments);
    }.bind(this), false );
    window.addEventListener( 'touchend', function(){
      this.onTouchEnd.apply(this, arguments);
    }.bind(this), false );
  }



  App.prototype.onTouchStart = function( event ) {
    this.touch.startX = event.touches[0].clientX;
    this.touch.startY = event.touches[0].clientY;
    this.touch.startCount = event.touches.length;
  }

  App.prototype.onTouchMove = function( event ) {

    // Each touch should only trigger one action
    if( !this.touch.captured ) {
      var currentX = event.touches[0].clientX;
      var currentY = event.touches[0].clientY;

      // There was only one touch point, look for a swipe
      if( event.touches.length === 1 && this.touch.startCount !== 2 ) {

        var deltaX = currentX - this.touch.startX,
          deltaY = currentY - this.touch.startY;

        if( deltaX > this.touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
          this.touch.captured = true;
          if(!this._visibileSlide) return;
          this._visibileSlide.backward();
        }
        else if( deltaX < -this.touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
          this.touch.captured = true;
          if(!this._visibileSlide) return;
          this._visibileSlide.forward();
        }
        event.preventDefault();
      }
    }
    // There's a bug with swiping on some Android devices unless
    // the default action is always prevented
    else if( navigator.userAgent.match( /android/gi ) ) {
      event.preventDefault();
    }

  }

  App.prototype.onTouchEnd = function( event ) {
    this.touch.captured = false;
  }


  App.prototype.slide = function(){
    var path = window.location.hash || "";
    var num = path.substring(1) || 1;
    num = parseInt(num);

    if(num > slides.length) return this.navigate('/' + (num-1), {trigger:false});

    var slide = this.loadSlide(num);
    this.showSlide(slide);
  }



  App.prototype.loadSlide = function(number){
    var config = slides[number-1] || {};
    config.presentationSize = this.mainContext.getSize();

    var slide = new Slide(config);

    slide.config({
      number: number,
      next: true,
      router: this
    });
    slide.opacity(0);
    this.mainContext.add(slide);
    return slide;
  }



  App.prototype.showSlide = function(slide) {
    var forward = this._visibileSlide && this._visibileSlide.number > slide.number ? false : true;
    function _show(){
      this._visibileSlide = slide;
      slide.show( forward );
    }
    if(this._visibileSlide) return this._visibileSlide.hide(forward, _show.call(this));
    _show.call(this);
  }


  App.prototype.start = function(){
    Backbone.history.start({
     pushState: false
    });
  }

  module.exports = App;

});
