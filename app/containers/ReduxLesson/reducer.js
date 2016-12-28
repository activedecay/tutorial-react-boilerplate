import * as C from './constants'
import initialState from './initial'
import todo from './atom'
import { combineReducers } from 'redux-immutable'

/** the default export handles the context of the atoms? i guess */
const byId = (state = initialState.get('byId'), action) => {
  switch (action.type) {
    case C.ADD_TODO:
    case C.TOGGLE_TODO:
    case C.REMOVE_TODO:
      return state.updateIn([action.id],
        t => todo(t, action))
    default:
      return state
  }
}
const ids = (state = initialState.get('ids'), action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return state.push(action.id)
    default:
      return state
  }
}
const todos = combineReducers({
  byId,
  ids,
})
export default todos
