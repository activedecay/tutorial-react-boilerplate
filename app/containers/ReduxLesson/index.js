import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import {createStructuredSelector} from 'reselect';
import {selectVisibleTodos} from './selectors';
import {addTodo, toggleTodo, setVisibility} from './actions'
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
      onFilterClick
    } = this.props
    return (
      <div className={styles.reduxLesson}>
        <FormattedMessage {...messages.header} />
        <div>
          <AddTodo onClick={(value) =>
            onClickBtn(uniq(), value)} />
          <Filter filterClick={f => onFilterClick(f)}
                  visible={todos} /> {/* todo in order to decouple this, make it a container.*/}
          <TodoList todos={todos}
                    onClick={id => onClickListItem(id)} />
        </div>
      </div>
    );
  }
}

ReduxLesson.propTypes = {
//  todo (that's funny) search why is this not required to get the context "component.contextTypes"
}

const mapStateToProps = createStructuredSelector({
  todos: selectVisibleTodos(),
})

/*const mapDispatchToProps = (dispatch) => ({
 onClickBtn(id, v) {dispatch(addTodo(id, v))},
 onClickListItem(id) {dispatch(toggleTodo(id))},
 onFilterClick(id) {dispatch(setVisibility(id))},
 dispatch
 })*/

/** note: these are not hot-reloaded. */
export default connect(mapStateToProps, {
  onClickBtn: addTodo,
  onClickListItem: toggleTodo,
  onFilterClick: ()=>{console.log('todo')}
})(ReduxLesson);
