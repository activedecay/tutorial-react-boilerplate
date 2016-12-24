import {
  SET_VISIBILITY,
} from './constants'
export function setFilter(filter) {
  return {
    type: SET_VISIBILITY,
    filter,
  }
}
