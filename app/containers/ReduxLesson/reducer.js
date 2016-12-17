import * as C from './constants'
import initialState from './initial'
import todo from './atom'

/** the default export handles the context of the atoms? i guess */
const todos = (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return state.updateIn(['todos'],
        list => list.push(todo(undefined, action)))
    case C.TOGGLE_TODO:
    case C.REMOVE_TODO:
      return state.updateIn(['todos'],
        list => list.map(t => todo(t, action)))
    default:
      return state
  }
};
export default todos
