import Task from 'data.task';
import expect from 'expect';

const launchMissiles = () =>
  new Task((rej, res) => {
    return res('missile');
  });

describe('fun task', () => {
  it('fork you', () => {
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
