/* eslint new-cap: "off" */
import Box from '../box'
import expect from 'expect'

// const moneyToFloat = (money) =>
//   parseFloat(money.replace(/\$/g,'')))
const moneyToFloat = (money) =>
  Box(money)
    .map(m => m.replace(/\$/g, ''))
    .map(n => parseFloat(n))

const percentToFloat = (percent) =>
  Box(percent)
    .map(p => p.replace(/%/g, ''))
    .map(n => n * 0.01)

const calculateDiscount = (cost, discount) =>
  moneyToFloat(cost)
    .fold(c => percentToFloat(discount)
      .fold(d => c - (c * d)))

describe('fun box', () => {
  it('has sides', () => {
    expect(Box(3)).toExist()
  })

  it('wont let you down', () => {
    expect(Box('tits').fold((t) => `${t} and ass`)).toBe('tits and ass')
  })

  it('can die', () => {
    expect(Box(' die ').map((s) => s.die).fold((d) => d)).toBe(undefined)
  })

  it('calculates discounts', () => {
    expect(calculateDiscount('$5.00', '20%')).toBe(4)
  })
})
