/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

// create the main context
var mainContext = Engine.createContext();

mainContext.setPerspective(1000);

var square = new Surface({
  size: [200, 200],
  classes: ['blue-background', 'backfaceVisibility']
});

var stateModifier = new StateModifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
});

stateModifier.setTransform(Transform.rotateY(1000), {duration: 500, curve: "easeOutBounce"});
stateModifier.setTransform(Transform.rotateY(0), {duration: 3000, curve: "easeOutBounce"});

mainContext.add(stateModifier).add(square);