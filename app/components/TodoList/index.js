import React from 'react'
import Todo from '../Todo'
import styles from './styles.css'

const TodoList = ({
  todos, onClick,
}) =>
  <ul className={styles.todoList}>
    {todos.map(t =>
      <Todo key={t.get('id')} todo={t} onClick={onClick} />) }
  </ul>

TodoList.propTypes = {
  todos: React.PropTypes.object,
  onClick: React.PropTypes.func,
}

export default TodoList
