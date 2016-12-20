// box is good at un-nesting expressions
const LaxyBox = g => ({ // promises/observables/streams
  map: f => LaxyBox(() => f(g())),
  // TODO define chain: f => f(x), // f must return another Box
  fold: f => f(g()),
  inspect: () => `Box(${g})`,
})
export default LaxyBox