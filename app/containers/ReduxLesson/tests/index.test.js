import ReduxLesson from '../index'
import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { translationMessages } from '../../../i18n'
import { Provider } from 'react-redux'
import LanguageProvider from 'containers/LanguageProvider'
import { browserHistory } from 'react-router'
import configureStore from '../../../store'
import { FormattedMessage, defineMessages } from 'react-intl'

describe('<ReduxLesson />', () => {
  let store

  before(() => {
    store = configureStore({}, browserHistory)
  })

  xit('has its own access to the store values', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ReduxLesson />
        </LanguageProvider>
      </Provider>
    )
    expect(renderedComponent.contains(<ReduxLesson />)).toBe(true)
  })


  xit('should render the default language messages', () => {
    const messages = defineMessages({
      someMessage: {
        id: 'some.id',
        defaultMessage: 'This is some default message',
      },
    })
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>
    )
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toEqual(true)
  })
})
