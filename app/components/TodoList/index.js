import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

import Todo from '../Todo'
import styles from './styles.css';


const TodoList = ({
  todos, onClick
}) => ( // todo fix generator to be more es6-like
  <ul className={styles.todoList}>
    {todos.map(t => <Todo key={t.get('id')} todo={t} onClick={onClick} />)}
  </ul>
)

export default TodoList;
