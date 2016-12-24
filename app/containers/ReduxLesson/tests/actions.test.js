import expect from 'expect'
import { addTodo, removeTodo, toggleTodo } from '../actions'
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../constants'

describe('ReduxLesson actions', () => {
  describe('action types', () => {
    it('has an add', () => {
      const expected = {
        type: ADD_TODO,
        id: 1,
        text: 'hi',
      }
      expect(addTodo(1, 'hi')).toEqual(expected)
    })

    it('has a toggle', () => {
      const expected = {
        type: TOGGLE_TODO,
        id: 1,
      }
      expect(toggleTodo(1, 'hi')).toEqual(expected)
    })

    it('has a remove', () => {
      const expected = {
        type: REMOVE_TODO,
      }
      expect(removeTodo()).toEqual(expected)
    })
  })
})
