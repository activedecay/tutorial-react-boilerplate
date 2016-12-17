import expect from 'expect';
import todosReducer from '../reducer';
import { fromJS, is } from 'immutable';
import { addTodo,/* removeTodo,*/toggleTodo } from '../actions';
import initialState from '../initial';

describe('todosReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState
  });

  it('should return the initial state', () => {
    expect(todosReducer(undefined, {})).toEqual(state);
  });

  it('should add another todo', () => {
    const expectedResult = state
      .updateIn(['todos'], list =>
        list.push(fromJS({ id: 0, text: 'learn', completed: false })))
    state = todosReducer(state, addTodo(0, 'learn'));
    expect(state).toEqual(expectedResult);
    const expectedResult2 = state
      .updateIn(['todos'], list =>
        list.push(fromJS({ id: 1, text: 'learn', completed: false })))
    expect(todosReducer(state, addTodo(1, 'learn'))).toEqual(expectedResult2);
  });

  it('should toggle', () => {
    state = fromJS({ todos: [
      { id: 0, completed: false }, { id: 1, completed: false }
    ] })
    let expected = fromJS({ todos: [
      { id: 0, completed: true }, { id: 1, completed: false }
    ] })
    let actual = todosReducer(state, toggleTodo(0))
    expect(is(actual, expected)).toBe(true)
    expected = fromJS({ todos: [
      { id: 0, completed: true }, { id: 1, completed: true }
    ] })
    actual = todosReducer(actual, toggleTodo(1))
    expect(is(actual, expected)).toBe(true)
  })
});
