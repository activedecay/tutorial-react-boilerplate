/**
 *
 * FilterLink
 *
 */

import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

import styles from './styles.css';

const FilterLink = props => { // todo fix generator
  /* todo the parent should not know the state/dispatch,
    so this can be a container.
    the only thing that this should need from the parent is the filter text from his constants
     we dont need constants here*/

  if (props['data-current']) {
    return <span className={styles.selected + " " + styles.filterLink}>{props.children}</span>
  } else {
    return <a className={styles['not-selected']} {...props}>
      <FormattedMessage {...messages.header} />
      {props.children}
      <FormattedMessage {...messages.footer} />
    </a>
  }
}

// todo ownProps? what happened to containers props? the container props are normally passed in mapStateToProps
// parent has <Filter filter={ALL} />
// mapStateToProps = (state, ownProps) => ({num: state.num, visible: ownProps.filter === state.visible})
// mapDispatchToProps = (dispatch, ownProps) => ({onClick: () => {dispatch(...)}})

export default FilterLink;
