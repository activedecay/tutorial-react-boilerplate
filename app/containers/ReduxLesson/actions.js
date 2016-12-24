/*
 * state changes with dispatching actions
 */

import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO,
} from './constants'
export function addTodo(id, text) {
  return {
    type: ADD_TODO,
    id,
    text,
  }
}
export function removeTodo() {
  return {
    type: REMOVE_TODO,
  }
}
export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}
