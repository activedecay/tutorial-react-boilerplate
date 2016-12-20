import Task from 'data.task'
import expect from 'expect'
import Box from '../box'
import {Either} from '../either'
import {id} from '../join'
import {Map, List} from '../immutable-ext'
import {futurize} from 'futurize'
const future = futurize(Task)

const addNormal = (x, y) => x + y // takes 2 arguments at runtime
const add1 = y => add(1, y) // supplies 1 argument, but it's at compile time
const add = x => y => x + y // takes both arguments at runtime
const inc = add(1) // inc now works the same as add1

const moduloNormal = (dvr, dvd) => dvd % dvr
const isOddNormal = dvd => modulo(2, dvd)
const modulo = dvr => dvd => dvd % dvr
const isOdd = modulo(2)

const filter = pred => xs => xs.filter(pred)
const getOdds = filter(isOdd)

const replace = regex => repl => str => // put your data last
  str.replace(regex, repl)
const censor = replace(/[aeiou]/g)('*')
const censorAll = a => a.map(censor)

describe('fun curry', () => {
  it('can supply a few args', () => {
    expect(getOdds([1, 2, 3, 4, 5, 6])).toEqual([1, 3, 5])
  })
  it('lets you supply the data last', () => {
    expect(replace(/a/g)('b')('aaaa')).toBe('bbbb')
    expect(censor('asshole')).toBe('*ssh*l*')
    expect(censorAll(['shit', 'balls'])).toEqual(['sh*t', 'b*lls'])
  })
})

describe('fun "ap" apply functions as values inside monads/functors', () => {
  it('apply "ap" flips map around, supplying arguments to functions that came before', () => {
    expect(Box(inc).ap(Box(2))).toEqual(Box(3))
    expect(Box(add).ap(Box(2)).ap(Box(3))).toEqual(Box(6))
  })

  // functor of x mapped over f() equals a functor of f() applied to a functor of x
  it('ap property: Functor(x).map(f) == Functor(f).ap(Functor(x))', () => {
    expect(Box(add).ap(Box(2)).ap(Box(3))).toEqual(Box(2).map(add).ap(Box(3)))
  })

  // const liftA2 = (f, x, y) => F(f).ap(x).ap(y) // can't write this one because we don't know F reflectively
  const liftA2 = (f, x, y) => x.map(f).ap(y) // but we can write this because of the above property.

  const $ = selector => Either.of({selector, height: 10})
  const getScreenSizeBad = (screen, head, foot) => screen - (head.height + foot.height)
  const getScreenSize = screen => head => foot => screen - (head.height + foot.height)

  it('this seems hard, because it is constantly wrapping context', () => {
    expect($('header').chain(head =>
      $('footer').map(footer =>
        getScreenSizeBad(800, head, footer)))).toEqual(Either.of(780))
  })
  it('is be easier to read the screensize function is curried', () => {
    expect(Either.of(getScreenSize(800)).ap($('.header')).ap($('.footer'))).toEqual(Either.of(780));
  })
  it('is even easier because of the use of lift', () => {
    expect(liftA2(getScreenSize(800), $('#header'), $('#footer'))).toEqual(Either.of(780));
  })

  // for (let x in xList) {
  //   for (let y in yList) {
  //     for (lst z in zList) {
  //       // this shit is messy
  //     }
  //   }
  // }
  // capture this messy imperative code in a List
  it('helps clean up nested imperative for loops', () => {
    expect(List.of(x => y => z => `${x}_${y}${z}`) // a declarative for-loop with list comprehension
      .ap(List([1, 2, 3]))
      .ap(List(['a', 'b']))
      .ap(List(['!'])))//.toEqual(List([ "1_a!", "1_b!", "2_a!", "2_b!", "3_a!", "3_b!" ]))
  })

  const Db = ({
    find: id => new Task((rej, res) =>
      setTimeout(() =>
        res({id: id, title: `Project:${id}`}), 1)) // could be set to larger timeout, but i'm impatient.
  })
  const reportHeader = (p1, p2) => `Report: ${p1.title} compare ${p2.title}`

  it('slow code can be cleaned up', (done) => {
    Db.find(20).chain(p1 =>
      Db.find(8).map(p2 => // waits for first db.find to complete !!! that's bad
        reportHeader(p1, p2))).fork(id, result => {
      expect(result).toEqual('Report: Project:20 compare Project:8')
      done()
    })
  })
  it('speed up the app using ap', (done) => {
    Task.of(p1 => p2 => reportHeader(p1, p2))
      .ap(Db.find(20)) // both requests happen at the same time
      .ap(Db.find(8))
      .fork(id, result => {
        expect(result).toEqual('Report: Project:20 compare Project:8')
        done()
      })
  })

  it('wow, getting complicated', (done) => {
    const tits = future((arg) => {
      expect(arg).toBe('ass');
      done()
    })
    tits('ass').fork(id, id) // the app wont finish without fork being called.
  })
})
