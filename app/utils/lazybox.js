// box is good at un-nesting expressions
const Box = (x) => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
})
export default Box