/** Direct selector to the filter state domain. see reducers.js */
const selectFilterDomain = () => state => state.get('filter')

export {
  selectFilterDomain,
}
