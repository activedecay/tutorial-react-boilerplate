import expect from 'expect'
import todos from '../reducer'
import { fromJS, is, List } from 'immutable'
import { addTodo, /* removeTodo,*/toggleTodo } from '../actions'
import initialState from '../initial'

describe('todosReducer', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(todos(undefined, {})).toEqual(state)
  })

  it('should add another todo', () => {
    const expectedResult = state
      .updateIn(['byId', '0'], () =>
        fromJS({ id: '0', text: 'learn', completed: false }))
      .updateIn(['ids'], () => List(['0']))
    state = todos(state, addTodo('0', 'learn'))
    expect(is(state, expectedResult)).toBeTruthy()
    const expectedResult2 = state
      .updateIn(['byId', '1'], () =>
        fromJS({ id: '1', text: 'learn', completed: false }))
      .updateIn(['ids'], (list) => list.push('1'))
    state = todos(state, addTodo('1', 'learn'))
    expect(is(state, expectedResult2)).toBeTruthy()
  })

  it('should toggle', () => {
    state = todos(state, addTodo('0', 'learn'))
    state = todos(state, toggleTodo('0'))
    const expectedState = fromJS({
      byId: { 0: { id: '0', text: 'learn', completed: true } },
      ids: ['0'],
    })
    expect(is(state, expectedState)).toBeTruthy()
  })

  it('should add new ids when todo is unknown', () => {
    expect(fromJS({})
      .updateIn(['unknown'], () => 'lol')
      .equals(fromJS({ unknown: 'lol' }))).toBe(true)
  })
})
