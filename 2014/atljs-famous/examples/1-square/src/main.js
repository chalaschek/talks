/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Surface = famous.core.Surface;

// create the main context
var mainContext = Engine.createContext();

mainContext.setPerspective(1000);

var square = new Surface({
  size: [200, 200],
  classes: ['blue-background']
});

var modifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
});

mainContext.add(modifier).add(square);