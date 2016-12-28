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
const getAllTodos = state =>
  state.ids.map(id => state.byId[id])

const getVisibleTodos = (state, filterName) => {
  const all = getAllTodos(state)
  switch (filterName) {
    case C.DONE:
      return all.filter(t => t.get('completed'))
    case C.DOIT:
      return all.filter(t => !t.get('completed'))
    default:
      return all
  }
}

const selectVisibleTodos = () => createSelector(
  selectReduxLessonDomain(),
  selectFilterDomain(),
  (todoDomain, filterDomain) =>
    getVisibleTodos(todoDomain.get('todos'), filterDomain)
)

export {
  selectReduxLessonDomain,
  selectVisibleTodos,
  selectTodos,
}
