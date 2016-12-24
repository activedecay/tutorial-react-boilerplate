/**
 * selectors remember the structure of the state.
 * all top-level state querying is encapsulated here.
 */
import { createSelector } from 'reselect' // memoizer
import * as C from '../FilterLink/constants'
import { selectFilterDomain } from '../FilterLink/selectors'

/** Direct selector to the reduxLesson state domain. see reducers.js */
const selectReduxLessonDomain = () => state => state.get('reduxLesson')

const selectTodos = () => createSelector(
  selectReduxLessonDomain(),
  (domain) => domain.get('todos')
)

/** any named function that starts with "get", prepares data to be displayed by the UI. */
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case C.DONE:
      return state.filter(t => t.get('completed'))
    case C.DOIT:
      return state.filter(t => !t.get('completed'))
    default:
      return state
  }
}

const selectVisibleTodos = () => createSelector(
  selectReduxLessonDomain(),
  selectFilterDomain(),
  (todoDomain, filterDomain) => getVisibleTodos(todoDomain.get('todos'), filterDomain)
)

export {
  selectReduxLessonDomain,
  selectVisibleTodos,
  selectTodos,
}
