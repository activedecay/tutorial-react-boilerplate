import { fromJS } from 'immutable'
import * as C from './constants'

/* create and update atomic (can't be broken down into smaller) objects */
const todo = (state, action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return fromJS({
        id: action.id,
        text: action.text,
        completed: false,
      })
    case C.TOGGLE_TODO:
      if (state.get('id') === action.id) {
        return state.set('completed', !state.get('completed'))
      }
      return state
    case C.REMOVE_TODO:
      return state // todo set a deleted flag?
    default:
      return state
  }
}
export default todo
