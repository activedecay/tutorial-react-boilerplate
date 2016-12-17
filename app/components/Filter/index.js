/**
*
* Filter
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {ALL, DOIT, DONE} from '../../containers/ReduxLesson/constants'
import styles from './styles.css';
import FilterLink from '../FilterLink'


function Filter({filterClick, visible}) {
  /* the child component should only need to know the filter name from constants. */
  return (
    <div className={styles.filter}>
      <FormattedMessage {...messages.header} />
      <FilterLink data-current={visible === ALL}
                  onClick={() => filterClick(ALL)}>
        <FormattedMessage {...messages.all} />
      </FilterLink>
      <FilterLink data-current={visible === DONE}
                  onClick={() => filterClick(DONE)}>
        <FormattedMessage {...messages.done} />
      </FilterLink>
      <FilterLink data-current={visible === DOIT}
                  onClick={() => filterClick(DOIT)}>
        <FormattedMessage {...messages.doit} />
      </FilterLink>
    </div>
  );
}

export default Filter;
