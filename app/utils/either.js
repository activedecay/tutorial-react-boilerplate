// Either = Right || Left
export const Right = (x) => ({
  map: f => Right(f(x)),
  chain: f => f(x), // f must return an either
  fold: (l, right) => right(x),
  concat: other => other.fold(leftX => Left(leftX),
    rightX => Right(x.concat(rightX))),
  inspect: () => `Right(${x})`,
})
export const Left = (x) => ({
  map: f => Left(x),
  chain: f => Left(x),
  concat: f => Left(x),
  fold: (left, r) => left(x),
  inspect: () => `Left(${x})`,
})
export const fromNullable = (x) =>
  x != null ? Right(x) : Left(null)
export const tryCatch = (f) => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}