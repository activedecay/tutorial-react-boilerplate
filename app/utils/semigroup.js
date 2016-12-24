// x = "a".concat("b").concat("c")
// x = ("a".concat("b")).concat("c") // associativity
// x = "a".concat("b".concat("c")) // associativity
// X + 0 = X; // 0 is an identity (monoid)
export const Sum = x => ({
  x,
  // concat: other => Sum(x + other.x)
  concat: ({ x: y }) => Sum(x + y), // destructure x
  inspect: () => `Sum(${x})`,
})
Sum.empty = () => Sum(0) // promoted to a monoid
export const Product = x => ({
  x,
  // concat: other => Product(x + other.x)
  concat: ({ x: y }) => Product(x + y), // destructure x
  inspect: () => `Product(${x})`,
})
Product.empty = () => Product(1) // promoted to a monoid
// t && f = f
// t && t = t
export const All = x => ({
  x,
  // concat: other => Sum(x + other.x)
  concat: ({ x: y }) => All(x && y), // destructure x
  inspect: () => `All(${x})`,
})
All.empty = () => All(true)
export const Any = x => ({
  x,
  // concat: other => Sum(x + other.x)
  concat: ({ x: y }) => Any(x || y), // destructure x
  inspect: () => `Any(${x})`,
})
Any.empty = () => Any(true)
export const Max = x => ({
  x,
  // concat: other => Sum(x + other.x)
  concat: ({ x: y }) => Max(x > y ? x : y), // destructure x
  inspect: () => `Max(${x})`,
})
Max.empty = () => Max(-Infinity)
export const Min = x => ({
  x,
  // concat: other => Sum(x + other.x)
  concat: ({ x: y }) => Min(x < y ? x : y), // destructure x
  inspect: () => `Min(${x})`,
})
Min.empty = () => Min(+Infinity)
export const First = x => ({
  x,
  concat: () => First(x), // ignores anything, always returns the original x
  inspect: () => `First(${x})`,
})
// First.empty() = ??? // can't be promoted to a monoid
/* rationale
associativity and identity property must hold for a monoid to exist */
/* example*//*
 const sum = nums =>
 nums.reduce((acc, x) => acc + x, 0)
 const all = bools =>
 bools.reduce((acc, x) => acc && x, true)
 const first = things =>
 things.reduce((acc, x) => acc/!*, no-such-identity*!/)
*/
