import {Map as ImmutMap, List as ImmutList} from 'immutable'

const derived = {
  fold : function(empty) {
    return this.foldMap(x => x, empty)
  },
  foldMap : function(f, empty) {
    return empty != null
      ? this.reduce((acc, x) => acc.concat(f(x)), empty)
      : this.reduce((acc, x) => acc.concat(f(x)))
  },
  sequence : function(point) {
    return this.traverse(point, x => x)
  }
}

// monoid
ImmutList.empty = ImmutList()
ImmutList.prototype.empty = ImmutList.empty

// traversable
ImmutList.prototype.traverse = function(point, f) {
  return this.reduce((ys, x) =>
    f(x).map(x => y => y.concat([x])).ap(ys), point(ImmutList()))
}

ImmutList.prototype.sequence = derived.sequence

// foldable
ImmutList.prototype.fold = derived.fold
ImmutList.prototype.foldMap = derived.foldMap

// applicative
ImmutList.prototype.ap = function(other) {
  return this.map(f => other.map(x => f(x))).flatten()
}

// monad
ImmutList.prototype.chain = ImmutList.prototype.flatMap;

ImmutMap.prototype.concat = function(o) {
  return this.mergeWith((p, n) => p.concat(n), o)
}

// monoid
ImmutMap.empty = ImmutMap({})
ImmutMap.prototype.empty = ImmutMap.empty

// foldable
ImmutMap.prototype.fold = derived.fold
ImmutMap.prototype.foldMap = derived.foldMap

// traverable
ImmutMap.prototype.traverse = function(point, f) {
  return this.reduce((acc, v, k) =>
    f(v, k).map(x => y => y.merge({[k]: x})).ap(acc), point(ImmutMap.empty))
}

ImmutMap.prototype.sequence = derived.sequence

// monad
ImmutMap.prototype.chain = ImmutMap.prototype.flatMap

export default {
  List: ImmutList,
  Map: ImmutMap
}