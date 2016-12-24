/**
 * Filter: holds filter links and modifies state.filter visible state
 */
import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {ALL, DOIT, DONE} from '../../containers/FilterLink/constants'
import styles from './styles.css';
import FilterLink from '../../containers/FilterLink'

const Filter = () => {
  return (
    <div className={styles.filter}>
      <FormattedMessage {...messages.header} />
      <FilterLink filter={ALL}>
        <FormattedMessage {...messages.all} />
      </FilterLink>
      <FilterLink filter={DONE}>
        <FormattedMessage {...messages.done} />
      </FilterLink>
      <FilterLink filter={DOIT}>
        <FormattedMessage {...messages.doit} />
      </FilterLink>
    </div>
  )
}
export default Filter