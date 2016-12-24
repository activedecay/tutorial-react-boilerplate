import { Either, Right, Left } from '../either'
import expect from 'expect'

// isomorphic:
// from(to(x)) == x
// works both ways:
// to(from(x)) == x
// notation:
// string ~ [char]

const iso = (to, from) => ({
  to,
  from,
})

const chars = iso(s => s.split(''), c => c.join(''))

// now we can write truncate with char[] methods
const truncate = str =>
  chars.from(chars.to(str).slice(0, 9)).concat('...')

describe('fun iso', () => {
  const s = 'helloworld'

  it('chars and strings with no changes to original', () => {
    expect(chars.from(chars.to(s))).toBe(s)
  })
  it('wow truncate text is way easier to read', () => {
    expect(truncate(s)).toBe('helloworl...')
  })
})

// an array with one item is isomorphic to an either of null or the item
// [x] ~ Either.of null or .of x
const singleton = iso(
  e => e.fold(() => [], x => [x]),
  ([x]) => x ? Right(x) : Left()
)
const filterEither = (e, pred) =>
  singleton.from(singleton.to(e).filter(pred))
const toUpper = s => s.toUpperCase()

describe('fun either filter', () => {
  it('singleton array used to filter either with predicate', () => {
    expect(filterEither(Either.of('hello'), x => x.match(/h/g)))
      .toEqual(Right('hello'))
    expect(filterEither(Either.of('hello'), x => x.match(/h/g))
      .map(toUpper))
      .toEqual(Right('HELLO'))
    expect(filterEither(Either.of('hello'), x => x.match(/NOPE/g))
      .map(toUpper))
      .toEqual(Left())
  })
})
