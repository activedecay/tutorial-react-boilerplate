// box is good at un-nesting expressions
const Box = (x) => ({
  map: f => Box(f(x)),
  chain: f => f(x), // f must return another Box
  fold: f => f(x),
  ap: monad => monad.map(x), // same as Box(x(monad.fold(id))),
  inspect: () => `Box(${x})`,
})
Box.of = x => Box(x)
export default Box
