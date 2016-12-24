import * as C from './constants'

/** the default export handles the context of the atoms
 * however, this is an example of a very simple state context,
 * so this reducer is already atomic. */
const filter = (state = C.ALL, action) => {
  switch (action.type) {
    case C.SET_VISIBILITY:
      return action.filter
    default:
      return state
  }
}
export default filter