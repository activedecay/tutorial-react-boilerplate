import { Either, Right, Left, fromNullable } from '../either'
import { List } from '../immutable-ext'
import Box from '../box'
import expect from 'expect'
import Task from 'data.task'
import { futurize } from 'futurize'
const future = futurize(Task)


// nt is natural transformation, which is, graphically:
// **********************************
// * f = (a) => b                   *
// * F.of(a) -:> .map(f) -:> F.of(b)*
// *          ||         ||         *
// * nt(F):G  \/         \/ nt(F):G *
// * G.of(a) -:> .map(f) -:> G.of(b)*
// **********************************

// nt holds if this property can be applied
// nt(F).map(f) = nt(G.map(f))
// nt(F.of(x)).map(f) = nt(G.of(x).map(f))
const add1 = x => x + 1 // some f

// remove the Either from its context, package the value into a Task
const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)
// remove the value from box, and package it into an either
const boxToEither = b =>
  b.fold(Either.of)
const first = loi => fromNullable(loi[0])

// failure nt
const failNtBoxToEither = b =>
  b.fold(Left)

describe('fun transformations', () => {
  it('F(a) -> G(a); move a value from one box to another', () => {
    eitherToTask(Either.of('lmao'))
      .fork(null, id => expect(id).toBe('lmao'))
    eitherToTask(Left('haha'))
      .fork(id => expect(id).toBe('haha'))
    expect(boxToEither(Box(3))).toEqual(Right(3))

    // definition of an NT
    // nt(F).map(f) = nt(G.map(f))
    expect(boxToEither(Box(1)).map(add1))
      .toEqual(boxToEither(Box(1).map(add1)))
    expect(first([1, 2]).map(add1))
      .toEqual(first([1, 2].map(add1)))

    // failing nt
    // this is why (box.map runs the fn, but left.map doesn't)
    expect(failNtBoxToEither(Box(1)).map(add1))
      .toNotEqual(failNtBoxToEither(Box(1).map(add1)))
  })
})

describe('fun natural transforms (nt) that do actual work', () => {
  it('in this sense, list is an nt', () => {
    let words = ['hello', 'world']// .chain(a => a.split(''))
    words = List(['hello', 'world'])
      .chain(a => List(a.split('')))
    expect(words.toJS())
      .toEqual(['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'])
  })

  const largeNumbers = loi => loi.filter(x => x > 100)
  const larger = x => x * 2
  // this is dumb. large numbers are doubled every number,
  // but we only want the first one.
  const app1 = xs => first(largeNumbers(xs).map(larger))
  // remembering nt(x).map(f) == nt(x.map(f)), we can write
  const app2 = xs => first(largeNumbers(xs)).map(larger)
  it('re-write first of largeNumbers made larger', () => {
    const xs = [1, 200, 3, 4000]
    expect(app1(xs)).toEqual(app2(xs))
  })

  const getDb = (id, error, cb) =>
    setTimeout(() => {
      if (error) {
        cb(Left(`${id}: not found`))
      } else {
        cb(error, Right(mockUser(id)))
      }
    }, 100)
  const query = future(getDb) // query is an async future task
  const mockUser = id => ({ id, bitchId: id - 1 })

  it('more actual work', (done) => {
    const isError = false
    query(8, isError).fork(null, (result) => {
      expect(result).toEqual(Right(mockUser(8)))
      done()
    })
  })
  // remember... "chain is fold_and_map
  // Task.of(1)
  //   .map(x => x + 1)
  //   .chain(x => Task.of(x + 1))
  //   .fork(err, ok)
  // ... and so, here's the naive solution

  it('super duper complex', (done) => {
    const isError = false
    query(3, isError) // task(either(user))
      .map(either =>// either(user)
        either.map(user =>
          query(user.bitchId, isError)) // either(task(either(user)))
      ) // task(either(either(task(either(user))))) //*christ!*

    // this is better
    const app = (id, err) => query(id, err) // task(either(user))
    // .map(eitherToTask) // task(task(user)) because no chain
      .chain(eitherToTask) // task(user) because F(x)=>G(x)
      .chain(user => query(user.bitchId, err) // task(either(user))
      )// task(either(user))
      .chain(eitherToTask)// task(user)

    app(3, isError).fork(e => e, ok => {
      expect(ok.bitchId).toBe(1) // bitchId of the bitchId of the user
      done()
    })
  })
})
