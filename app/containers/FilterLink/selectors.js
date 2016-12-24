import {createSelector} from 'reselect'; // memoizer
import * as C from './constants'
/** Direct selector to the filter state domain. see reducers.js */
const selectFilterDomain = () => state => state.get('filter');

export {
  selectFilterDomain,
};
