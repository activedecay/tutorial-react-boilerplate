import Task from 'data.task';
import expect from 'expect';
import {Map, List} from '../immutable-ext';
import {futurize} from 'futurize';
const future = futurize(Task);

const launchMissiles = () =>
  new Task((rej, res) => {
    return res('missile');
  });

describe('fun task', () => {
  it('fork you - task chaining', () => {
    expect(Task.of(1)
      .map(x => x + 1)
      .chain(x => Task.of(x + 1))
      .fork(e => 'err', ok => 'ok' + ok)
    ).toEqual('ok3');
    expect(Task.rejected(1)
      .map(x => x + 1) // ignored
      .chain(x => Task.of(x + 1)) // ignored
      .fork(e => 'err' + e, ok => 'ok')
    ).toEqual('err1');
  });
  it('launch missiles', () => {
    const application = launchMissiles()
      .map(x => x + ' is heading for target!!');
    expect(application); // does not do anything
    expect(application.fork(null, ok => 'ok: ' + ok))
      .toEqual('ok: missile is heading for target!!');
  });
});

// const app = () =>
//   readFile('config.json', 'utf-8', (err, contents) => {
//     if (err) throw err
//     const newContents = contents.replace(/777/g, '666')
//     fs.writeFile('config.edit.json, newcontents', (err, _) => {
//       if (err) throw err
//     })
//   })

// const readFile = (filename, encoding) => {
//   new Task((rej, res) =>
//     fs.readFile(filename, encoding, (err, contents) =>
//       err ? rej(err) : res(contents)))
// }
// const writeFile = (filename, contents) => {
//   new Task((rej, res) =>
//     fs.writeFile(filename, contents, (err, ok) =>
//       err ? rej(err) : res(contents)))
// }
//
// const app = // this won't be invoked until someone calls fork
//   readFile("config.json", "utf-8")
//     .map(contents => contents.replace(/777/g, '666'))
//     .chain(newContents => writeFile("config.edit.json", newContents))



describe('fun futures things', () => {
  it('things', (done) => {
    setTimeout(() => done(), 100)
  })
  const stuff = (done) => setTimeout(() => done(), 100)
  it('stuff', (done) => {
    stuff(done)
  })
  const read = (contents, error, cb) => {
    setTimeout(() => {
      // the callback is defined in node, and this read function is, too
      // whether there was an error will be used as the first arg to the
      // callback. if there was a successful run, the second arg is the
      // return value of the read function, which is usually the contents
      // of a file, or it could be the contents of a database read.
      cb(error, "!" + contents)
    }, 1)
  }
  const readTask = future(read)

  // const FuturIze = (TasK) =>
  //   (FunC) =>
  //     (Args) =>
  //       new TasK((lose, win) => {
  //         FunC(Args, (err, content) => {
  //           err ? lose() : win(content)
  //         })
  //       })

  it('task was hardest to understand; re-writing all the shit helped', (done) => {
    // const fu = FuturIze(Task)
    // const r = fu(read)
    // let error = false
    // const t = r("yay?", error)
    // t.fork(errorCase, (/*"yay?"*/) => {/*would be called.*/})
    let error = false
    const t = readTask("ass and titties", error)
    t.fork((res) => {
        expect(res).toBe({});
        done()
      },
      (res) => {
        expect(res).toBe("!ass and titties");
        done()
      })
  })

  // now back to our program
  it('task array [Task...] => task of an array of contents Task([...])', (done) => {
    let things = List(['tits', 'and', 'ass'])
    let error = false
    things.traverse(Task.of, t => readTask(t, error))
      .fork(null/*not called*/, (result) => {
        expect(result).toEqual(List(['!tits', '!and', '!ass']))
        done()
      })
  })

  const grab = (part) =>
    Task.of(`grab ${part}`)

  it('map of props to task => task of map of props to content (fuckin love this)', () => {
    // Map({tits: 'ass', ass: 'titties'}).map(part => grab(part, {}))
    // is a map of props to task of a grabbed part
    Map({tits: 'ass', ass: 'titties'})
      .traverse(Task.of, part => grab(part))
      .fork(null/*never called*/,
        (result) =>
          expect(result)
            .toEqual(Map({tits: 'grab ass', ass: 'grab titties'})))

    // holds structure without having to permute, bookkeeping, bullshit
    // ... and can be deeply nested, as below
    Map({ass: ['tons of ass', 'big ass'], tits: ['nice titties']})
      .traverse(Task.of, parts =>
        List(parts)
          .traverse(Task.of, part => grab(part)))
      .fork(null/*never called*/,
        (result) =>
          expect(result)
            .toEqual(Map({
              ass: List(['grab tons of ass', 'grab big ass']),
              tits: List(['grab nice titties'])
            })))
  })
})
