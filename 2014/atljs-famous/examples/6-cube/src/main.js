/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var Modifier = famous.core.Modifier;
var View = famous.core.View;

// create the main context
var mainContext = Engine.createContext();

mainContext.setPerspective(1000);

function Cube(options){
  View.call(this, options);
  this.size = options.size || 200;
  this.initSurfaces();
}

Cube.prototype = Object.create(View.prototype);
Cube.prototype.constructor = Cube;

Cube.prototype.initSurfaces = function(){

  var surfaceRotations = [
    [0, 0, 0],
    [0, degreesToRadian(90), 0],
    [0, degreesToRadian(-90), 0],
    [0, degreesToRadian(180), 0],
    [degreesToRadian(90), 0, 0],
    [degreesToRadian(-90), 0, 0]
  ];

  var surfaceTranslations = [
    [0, 0, this.size/2],
    [this.size/2, 0, 0],
    [-this.size/2, 0, 0],
    [0, 0, -this.size/2],
    [0, this.size/2, 0],
    [0, -this.size/2, 0]
  ];

  for(var i = 0; i < 6; i++){
    var opacityModifier = new Modifier({
      opacity: 0.8
    });

    var translationModifier = new Modifier({
      transform: Transform.translate.apply(this, surfaceTranslations[i] )
    });

    var rotationModifier = new Modifier({
      transform: Transform.rotate.apply(this, surfaceRotations[i])
    });

    var surface = new Surface({
      size: [this.size, this.size],
      properties: {
        border: '1px solid #333'
      },
      classes: ['backfaceVisibility', 'blue-background']
    });

    this.add(opacityModifier).add(translationModifier).add(rotationModifier).add(surface);
  }
}

function degreesToRadian(deg){
  return deg * Math.PI/180;
}

var cube = new Cube({
  size: 200
});


var angle = 1;
var modifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function(){
    angle += 0.02;
    return Transform.rotate(angle, angle, 0);
  }
});


mainContext.add(modifier).add(cube);