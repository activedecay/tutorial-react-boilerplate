import React from 'react'
import styles from './styles.css'
import Button from '../../components/Button'

const AddTodo = ({ onClick }) => {
  let ourText
  return (
    <div className={styles.addTodo}>
      <input
        ref={node => {
          ourText = node
        }}
      />

      <Button
        onClick={() => {
          onClick(ourText.value)
          ourText.value = ''
        }}
      > add </Button>
    </div>
  )
}

AddTodo.propTypes = {
  onClick: React.PropTypes.func,
}

export default AddTodo
