import { fromJS } from 'immutable'
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem('state', serialized)
  } catch (e) {
    // ignore/todo log
  }
}