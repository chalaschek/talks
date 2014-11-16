/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var SpringTransition = famous.transitions.SpringTransition;

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

stateModifier.setTransform(Transform.rotateY(1000), {
  method: SpringTransition,
  period: 500,
  dampingRatio: 0.2
});

stateModifier.setTransform(Transform.rotateY(0), {
  method: SpringTransition,
  period: 500,
  dampingRatio: 0.2
});

mainContext.add(stateModifier).add(square);