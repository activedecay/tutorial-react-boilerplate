import LazyBox from '../lazybox'
import expect from 'expect'

describe('fun lazy box', () => {
  it('is a lazy egg', () => {
    expect(LazyBox(() => {
      throw "nope"
    }).map(a => b))
  })
})
