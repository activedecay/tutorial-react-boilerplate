import FilterLink from '../index'
import { mount } from 'enzyme'
import React from 'react'
import expect from 'expect'
import LanguageProvider from '../../../containers/LanguageProvider'
import configureStore from '../../../store'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { translationMessages } from '../../../i18n'
import { selectFilterDomain } from '../selectors'

describe('<FilterLink />', () => {
  let store
  before(() => {
    store = configureStore({}, browserHistory)
  })

  it('should have span when currently selected', () => {
    const filter = selectFilterDomain()(store.getState())
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FilterLink filter={filter} />
        </LanguageProvider>
      </Provider>
    )
    expect(renderedComponent.find('span').length).toBe(1)
  })

  it('should have anchor when not currently selected', () => {
    const filter = 'filter not equal to store.getState().filter'
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FilterLink filter={filter} />
        </LanguageProvider>
      </Provider>
    )
    expect(renderedComponent.find('a').length).toBe(1)
  })
})
