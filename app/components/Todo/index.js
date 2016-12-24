import React from 'react'
import styles from './styles.css'

const Todo = ({ todo, onClick }) =>
  <li
    onClick={() => onClick(todo.get('id'))}
    className={todo.get('completed') ? styles.completed : ''}
  >
    {`${todo.get('text')} ${todo.get('id')} ${todo.get('completed')}`}
  </li>

Todo.propTypes = {
  todo: React.PropTypes.object,
  onClick: React.PropTypes.func,
}

export default Todo
