import { Map as ImmutMap, List as ImmutList } from 'immutable'

const derived = {
  // this term "fold" is overloaded... however, the intuition
  // is to remove the value from the context.
  // the context is a list of thing. so fold removes 1 thing.
  fold(empty) {
    return this.foldMap(x => x, empty)
  },
  foldMap(f, empty) {
    return empty != null
      ? this.reduce((acc, x) => acc.concat(f(x)), empty)
      : this.reduce((acc, x) => acc.concat(f(x)))
  },
  sequence(point) {
    return this.traverse(point, x => x)
  },
}

// monoid
ImmutList.empty = ImmutList()
ImmutList.prototype.empty = ImmutList.empty

// traversable
ImmutList.prototype.traverse = function traverse(point, mutator) {
  return this.reduce((accumRetVal, x) =>
      mutator(x)
        .map(mutatedX => y => y.concat([mutatedX]))
        .ap(accumRetVal),
    point(ImmutList()))
}

ImmutList.prototype.sequence = derived.sequence

// foldable
ImmutList.prototype.fold = derived.fold
ImmutList.prototype.foldMap = derived.foldMap

// applicative
ImmutList.prototype.ap = function ap(other) {
  return this.map(f => other.map(x => f(x))).flatten()
}

// monad
ImmutList.prototype.chain = ImmutList.prototype.flatMap

ImmutMap.prototype.concat = function concat(o) {
  return this.mergeWith((p, n) => p.concat(n), o)
}

// monoid
ImmutMap.empty = ImmutMap({})
ImmutMap.prototype.empty = ImmutMap.empty

// foldable
ImmutMap.prototype.fold = derived.fold
ImmutMap.prototype.foldMap = derived.foldMap

// traversable
ImmutMap.prototype.traverse = function traverse(point, f) {
  return this.reduce((acc, v, k) =>
    f(v, k).map(x => y => y.merge({ [k]: x })).ap(acc), point(ImmutMap.empty))
}

ImmutMap.prototype.sequence = derived.sequence

// monad
ImmutMap.prototype.chain = ImmutMap.prototype.flatMap

export const List = ImmutList
export const Map = ImmutMap
