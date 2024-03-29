import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import Footer from '../index'

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Footer />)
    expect(renderedComponent.contains(
      <section>
        <p>
          <FormattedMessage {...messages.licenseMessage} />
        </p>
      </section>
    )).toEqual(true)
  })

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />)
    expect(renderedComponent.contains(
      <section>
        <p>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: 'dJuspin',
            }}
          />
        </p>
      </section>
    )).toEqual(true)
  })
})
