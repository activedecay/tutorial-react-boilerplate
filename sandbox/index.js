const Task = require('data.task')
const Either = require('data.either')
const Left = Either.Left
const request = require('request')
const {List, Map} = require('immutable-ext')
const keys = require('./keys')
/*
 * client ID and client secret key needed
 *   -H Authorization: Basic <base64 encoded client_id:client_secret>
 *   -d {grant_type: 'client_credentials'}
 *   -X POST
 *   https://accounts.spotify.com/api/token
 *   => {access_token: '...'}
 If you get status code 429, it means that you have sent too many requests.
 If this happens, have a look in the Retry-After header, where you will see a number displayed.
 This is the amount of seconds that you need to wait, before you can retry sending your requests. */
const tokenUrl = 'https://accounts.spotify.com/api/token'
let bearer
const saveToken = token => {
  bearer = token
  return token
}
const getAccess = () =>
  Either.fromNullable(bearer)
    .fold(left => postHttp({
        url: tokenUrl,
        method: "POST",
        form: {grant_type: 'client_credentials'},
        headers: {Authorization: 'Basic ' + keys.base64}
      })
        .map(parse)
        .chain(eitherToTask)
        .map(j => j.access_token)
        .map(saveToken),
      Task.of)

// data.artists.items[0].id
const artistSearchUrl = (artist) =>
  `https://api.spotify.com/v1/search?q=${artist}&type=artist`
// data.artists[].name
const artistsRelatedToUrl = (id) =>
  `https://api.spotify.com/v1/artists/${id}/related-artists`

const eitherToTask = e => e.fold(Task.rejected, Task.of)
const intersection = xs => ({
  xs,
  concat: ({xs: ys}) =>
    intersection(xs.filter(x => ys.some(y => x === y)))
})
const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y), // destructure x
  inspect: () => `Sum(${x})`
})

const parse = Either.try(JSON.parse)
const getHttp = options =>
  new Task((rej, res) =>
    request(options, (err, resp, body) =>
      err ? rej() : res(body)))
const postHttp = options =>
  new Task((rej, res) =>
    request(options, (err, resp, body) =>
      err ? rej() : res(body)))
const getJson = (url) =>
  getAccess()
    .chain(access => getHttp({url, headers: {'Authorization': 'Bearer ' + access}}))
    .map(parse)
    .chain(eitherToTask)

const log = data => {
  console.log(data)
  return data
}

const first = xs => Either.fromNullable(xs[0])
const findArtist = name =>
  getJson(artistSearchUrl(name))
    .map(data => data.artists.items)
    .map(first)
    .chain(eitherToTask)
const relatedArtists = id =>
  getJson(artistsRelatedToUrl(id))
    .map(data => data.artists)
    .map(artists => artists.map(artist => artist.name))
const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)

const artistIntersection = rels =>
  rels.foldMap(xs => Map({xs: intersection(xs), sum: Sum(xs.length)}))

const formatString = depth => j => JSON.stringify(j, null, depth)

const main = (names) =>
  names // List.of([name,names...]
    .traverse(Task.of, related) // Task.of([related,related artists...]
    .map(artistIntersection)
    .map(o => [o.get('xs')['xs'], o.get('sum').x])
    .map(formatString(2))

// oasis blur radiohead => pulp
Task.of(process.argv)
  .map(a => List(a.slice(2)))// [blah,blah, args...] => [args...]
  .chain(main)
  .fork(console.error, console.log)
