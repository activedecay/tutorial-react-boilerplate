import {Right, Left, fromNullable, tryCatch} from '../either'
import expect from 'expect'

const getColor = color =>
  fromNullable({red: "#redhash", purple: "#purphash"}[color])

const readFile = (f) => {
  switch (f) {
    case ('data.json'):
      return "{\"port\":777}"
    case ('garbage.json'):
      return "{\"port:777}"
    default:
      throw `File(${f}): nope`
  }
}

// always, safely, returns a port
const getPort = (file) => {
  return tryCatch(() => readFile(file))
    .chain(data => tryCatch(() => JSON.parse(data)))
    .fold(e => 666,
      json => json.port)
}

describe('fun either', () => {
  it('wont let you down', () => {
    expect(Right('lol').map(l => 'troll').fold(null, t => t)).toBe('troll')
    expect(Left('lol').map(l => 'troll').fold(t => t, null)).toBe('lol')
  })

  it('fails gracefully', () => {
    expect(getColor('ass')
      .map(c => c.slice(1))
      .fold(a => 'error ' + a)).toBe('error null')
    expect(getColor('red')
      .map(c => c.slice(1))
      .fold(null, c => c)).toBe('redhash')
  })

  it('exception handling', () => {
    expect(() => {
      throw new Error('boombastic!')
    }).toThrow(/semifant|astic/)
    expect(getPort('data.json')).toBe(777)
    expect(getPort('dne.json')).toBe(666)
    expect(getPort('garbage.json')).toBe(666)
  })
})

/*exercies*/
const openSite = () =>
  fromNullable(currentUser)
    .fold(showLogin, renderPage)

const getPrefs = user =>
  (!user.premium ? Left('not premium') : Rgith(user))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

const streetName = user =>
  fromNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(e => 'no street', n => n)

const concatUniq = (x, yList) =>
  fromNullable(yList.filter(y => y === x)[0])
    .fold(() => yList.concat(x), () => yList)

const getFile = options =>
  fromNullable(options.path)
    .chain(p => tryCatch(getFile(p))
      .fold(() => options), f => ({
        ...options,
        file: f
      }
    ))
