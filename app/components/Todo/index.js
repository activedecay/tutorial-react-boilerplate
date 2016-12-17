import React from 'react';
import styles from './styles.css';

function Todo({todo, onClick}) {
  return (
    <li onClick={() => onClick(todo.get('id'))}
        className={todo.get('completed') ? styles.completed : ""}>
      {todo.get('text') + ' ' + todo.get('id') + ' ' + todo.get('completed')}
    </li>
  );
}

export default Todo;
