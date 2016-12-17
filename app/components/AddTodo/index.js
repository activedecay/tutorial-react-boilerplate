/**
*
* AddTodo
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import Button from '../../components/Button'

const AddTodo = ({onClick}) => { // todo fix generator (don't use function)
  let ourText;
  return (
    <div className={styles.addTodo}>
      <input ref={node => {
        ourText = node
      }} />

      <Button onClick={() => {
        onClick(ourText.value)
        ourText.value = ''
      }}> add </Button>
    </div>
  );
}

export default AddTodo;
