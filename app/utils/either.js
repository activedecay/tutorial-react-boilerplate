// Either = Right || Left
export const Right = (x) => ({
  map: f => Right(f(x)), // runs the function
  chain: f => f(x), // f must return an either
  fold: (l, right) => right(x), // remove value from its context
  concat: other => other.fold(leftX => Left(leftX),
    rightX => Right(x.concat(rightX))),
  ap: monad => monad.map(x), // same as Right(x(monad.fold(id))),
  inspect: () => `Right(${x})`,
});
export const Left = (x) => ({
  map: f => Left(x), // just plain won't run the function
  chain: f => Left(x), // must return an either
  concat: f => Left(x), // just plain won't run the function
  fold: (left, r) => left(x), // remove the value from its context
  ap: monad => monad.map(x),
  inspect: () => `Left(${x})`,
});
export const Either = {
  of: x => Right(x),
};
export const fromNullable = (x) =>
  x != null ? Right(x) : Left(null);
export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
