import { All, Sum, First } from '../semigroup'
import { Right, Left } from '../either'
import { Map, List } from '../immutable-ext'
import expect from 'expect'

describe('fun semigroup', () => {
  it('sum, all, first semigroups', () => {
    expect(Sum.empty().concat(Sum(1)).concat(Sum(2)))
      .toEqual(Sum(3))
    expect(Sum.empty().concat(Sum(9)).concat(Sum(2)))
      .toEqual(Sum(11))
    expect(All.empty().concat(All(true)).concat(All(false)))
      .toEqual(All(false))
    expect(All.empty().concat(All(true)).concat(All(true)))
      .toEqual(All(true))
    expect(First('troll')
      .concat('lol').concat('trill')).toEqual(First('troll'))
  })
  it('either semigroup', () => {
    expect(Right('lol').concat(Right('hehe')).fold(null, a => a))
      .toEqual('lolhehe')
    expect(Right('lol').concat(Left('tits')).fold(a => a, null))
      .toEqual('tits')
    expect(Left('tits').concat(Right('ass')).fold(a => a, null))
      .toEqual('tits')
  })
})

// if all attributes are concat-able, then object is concatable
const acct1 =
  Map({
    name: First('Bob R.'), paid: All(false), score: Sum(3), friends: ['Jordy'],
  })
const acct2 =
  Map({
    name: First('Bob R.'), paid: All(true), score: Sum(1), friends: ['Bjork'], enemies: ['Becky'],
  })
const acct3 =
  {
    enemies: ['Becky'], friends: ['Jordy', 'Bjork'], name: First('Bob R.'), paid: All(false), score: Sum(4),
  }

describe('fun immutable concatable', () => {
  it('can concat a map where each entry is concat-able', () => {
    expect(acct1.concat(acct2).toJS()).toEqual(acct3)
  })
})

describe('fun reducing and folding == foldMap', () => {
  it('should act like this', () => {
    expect([Sum(1), Sum(2)].reduce(
      (acc, x) => acc.concat(x),
      Sum.empty())).toEqual(Sum(3))
  })
  it('totally acts like that', () => {
    expect(List.of(Sum(1), Sum(2)).fold(Sum.empty()))
      .toEqual(Sum(3))
  })
  it('should written sexier', () => {
    expect(Map({ brian: 3, sara: 1 })
    // .map(n => Sum(n))
      .map(Sum)
      .fold(Sum.empty())).toEqual(Sum(4))
  })
  it('should written even sexier', () => {
    expect(Map({ brian: 3, sara: 1 })
    // .map(n => Sum(n))
      .foldMap(Sum, Sum.empty())).toEqual(Sum(4))
  })
  it('eat my ass', () => {

  })
})
