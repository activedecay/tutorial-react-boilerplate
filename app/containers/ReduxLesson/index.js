import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import { createStructuredSelector } from 'reselect'
import { selectVisibleTodos } from './selectors'
import { addTodo, toggleTodo } from './actions'
import AddTodo from '../../components/AddTodo'
import Filter from '../../components/Filter'
import TodoList from '../../components/TodoList'
import uniq from 'uniqid'

export class ReduxLesson extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      todos,
      onClickBtn,
      onClickListItem,
    } = this.props
    return (
      <div className={styles.reduxLesson}>
        <FormattedMessage {...messages.header} />
        <div>
          <AddTodo onClick={(value) => onClickBtn(uniq(), value)} />
          <Filter />
          <TodoList todos={todos} onClick={id => onClickListItem(id)} />
        </div>
      </div>
    )
  }
}

ReduxLesson.propTypes = {
  todos: React.PropTypes.object,
  onClickBtn: React.PropTypes.func,
  onClickListItem: React.PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  todos: selectVisibleTodos(),
})

/** note: these are not hot-reloaded. */
export default connect(mapStateToProps, {
  onClickBtn: addTodo,
  onClickListItem: toggleTodo,
})(ReduxLesson)
