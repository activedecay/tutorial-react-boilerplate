// box is good at un-nesting expressions
const LaxyBox = g => ({ // promises/observables/streams
  map: f => LaxyBox(() => f(g())),
  fold: f => f(g()),
  inspect: () => `Box(${g})`,
})
export default LaxyBox