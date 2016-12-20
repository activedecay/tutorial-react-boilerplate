import expect from 'expect';
import Box from '../box';
import { Either, Right, Left, fromNullable } from '../either';
import { join, id } from '../join';
import Task from 'data.task';
import { List, Map } from '../immutable-ext';

/* todo any of these imported functors can be used below. */

describe('fun functors: Must be true in order to be a functor', () => {
  it('should not matter if you: fx.map(f).map(g) = fx.map(x => g(f(x))', () => {
    Box('squirrels')
      .map(s => s.substring(5))
      .map(s => s.toUpperCase());
    Box('squirrels')
      .map(s => s.substring(5).toUpperCase());
  });
  it('should have the identity property: const id = x => x', () => {
    expect(List.of(Box('crayons')).map(id)).toEqual(id(List.of(Box('crayons'))));
  });
  it('has either that returns right to allow mapping directly', () => {
    expect(Either.of('hello').map(x => x + '!').fold(null, id)).toEqual('hello!');
  });
});

/* lifting a value into a type with "of" */
Task.of('hi');
Either.of('hello').map(x => x + '!');

/* monad examples */
const httpGet = (url) =>
  Task.of('(' + url + ':RESPONSE)');

const updateDom = (user, comments) =>
  Task.of(`DOM UPDATED with ${user}'s comments ${comments}`);

httpGet('/users') // more expressive! nest computation beautifly!
  .chain(user => httpGet(`/comments/${user}`)
  // .map() // taskGetComments(taskGetUsers(userRESPONSE))
    .chain(comments => updateDom(user, comments)));// map() // taskUpdateDom(taskGetComments(taskGetUsers(userResponse)))

/* monadic interface. */
/* F.of, chain (flatMap, bind, >>= */
describe('fun monads', () => {
  it('has of method', () => {
  });
  it('has chain method', () => {
  });


  it('join(m.map(join)) === join(join(m))', () => {
    const x = 3;
    const m = Box(Box(x));
    expect(join(m.map(join))).toEqual(join(join(m)));
    expect(join(m.map(join))).toEqual(x);
    expect(join(join(m))).toEqual(x);
  });

  it('join(F.of(m)) === join(m.map(Box.of))', () => {
    const m = Box('wonder');
    expect(join(Box.of(m))).toEqual(join(m.map(Box.of)));
    expect(join(Box.of(m))).toEqual(m);
    expect(join(m.map(Box.of))).toEqual(m);
  });

  it('map is definable by F.of and chain()', () => {
    const m = Box.of('ass');
    expect(Box.of('ass').map(ass => 'tits')).toEqual(m.chain(ass => Box.of('tits')));
    expect(Box(x => x + 1).map(x => x(1))).toEqual(Box(2));
    // weird how he said `m.chain(x => M.of(f(x))` what does that mean?
    // a monad is a functor? jesus wtf are you talking about
    // a monad is an applicative functor? jesus wtf are you talking about
  });
});
