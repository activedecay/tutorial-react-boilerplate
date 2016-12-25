import Filter from '../index'
import FilterLink from '../../../containers/FilterLink'

import messages from '../messages'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'enzyme'
import expect from 'expect'

describe('<Filter />', () => {
  it('should have filter children', () => {
    expect(shallow(<Filter />).find(FilterLink).length).toBe(3)
  })

  it('filter should have internationalized header text', () => {
    expect(shallow(<Filter />).contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true)
  })
})
