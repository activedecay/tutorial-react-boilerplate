import React from 'react'
import { selectFilterDomain } from '../FilterLink/selectors'
import { setFilter } from '../FilterLink/actions'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'

class FilterLink extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      filter,
      visible,
      onClick,
      children,
    } = this.props
    if (filter === visible) {
      return (<span className={[styles.selected, styles.filterLink].join(' ')}>
        {children}
      </span>)
    }
    return (<a className={styles['not-selected']} onClick={() => onClick(filter)}>
      <FormattedMessage {...messages.header} />
      {children}
      <FormattedMessage {...messages.footer} />
    </a>)
  }
}

FilterLink.propTypes = {
  filter: React.PropTypes.string,
  visible: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.any,
}

const mapStateToProps = createStructuredSelector({
  visible: selectFilterDomain(),
})

/** note: these are not hot-reloaded. */
export default connect(mapStateToProps, {
  onClick: setFilter,
})(FilterLink)
