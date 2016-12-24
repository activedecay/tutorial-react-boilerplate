import React from 'react';
import {selectFilterDomain} from '../FilterLink/selectors';
import {setFilter} from '../FilterLink/actions'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class FilterLink extends React.Component {
  render() {
    const {
      filter,
      visible,
      onClick,
      children,
    } = this.props
    if (filter === visible) {
      /* todo can't this be className=[styles.selected, styles.filterLink] ? */
      return <span className={styles.selected + " " + styles.filterLink}>
        {children} f={filter}
        </span>
    } else {
      return <a className={styles['not-selected']} onClick={() => onClick(filter)}>
        <FormattedMessage {...messages.header} />
        {children} f={filter}
        <FormattedMessage {...messages.footer} />
      </a>
    }
  }
}

const mapStateToProps = createStructuredSelector({
  visible: selectFilterDomain(),
})

/** note: these are not hot-reloaded. */
export default connect(mapStateToProps, {
  onClick: setFilter,
})(FilterLink);


// todo fix generator
/* todo the parent should not know the state/dispatch,
 so this can be a container.
 the only thing that this should need from the parent is the filter text from his constants
 we dont need constants here*/
// todo ownProps? what happened to containers props? the container props are normally passed in mapStateToProps
// parent has <Filter filter={ALL} />
// mapStateToProps = (state, ownProps) => ({num: state.num, visible: ownProps.filter === state.visible})
// mapDispatchToProps = (dispatch, ownProps) => ({onClick: () => {dispatch(...)}})
